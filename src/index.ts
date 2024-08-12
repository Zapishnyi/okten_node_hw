import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import { Error } from "mongoose";
import swagger from "swagger-ui-express";

import swaggerDoc from "../api_documentation/api_documentation.json";
import { config } from "./configs/config";
import { jobRunner } from "./crons/cronStack";
import { IAPIError } from "./interfaces/IAPIError";
import { authRouter } from "./routers/auth.router";
import { carRouter } from "./routers/car.router";
import { userRouter } from "./routers/user.router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the CORS middleware
// Generally used for blocking access from domens that not comply with described domen list or rules or methods
// app.use(
//     cors({
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//         allowedHeaders: [
//             "Authorization",
//             "Content-Type",
//             "Origin",
//             "Access-Control-Allow-Origin",
//         ],
//         preflightContinue: false,
//         optionsSuccessStatus: 200,
//     }),
// );

// in our case we use to grand access from different places overriding browser restriction
app.use(cors());

// Swagger middleware
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));

// AWS file management
app.use(fileUpload());

// To use access to endpoint  limiter  for users globally

// app.use(
//   rateLimit({
//     //   Limit access to endpoint by certain rules - "express-rate-limit"
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   }),
// );

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

//All errors final end point
app.use(
  "*",
  (err: IAPIError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err.errorResponse?.code && err.errorResponse?.code === 11000) {
      res
        .status(409)
        .json(
          `Such a ${Object.keys(err.errorResponse.keyValue)} is already exist`,
        );
    } else {
      res.status(err.status || 500).json(err.message);
    }
  },
);

// Exemption error handler
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception error:", err.message, err.stack);
  process.exit(1);
});

// Server start
app.listen(config.APP_PORT, config.APP_HOST, async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log(`server started at port ${config.APP_PORT} `);
  //   Cron job runner:
  jobRunner();
});
