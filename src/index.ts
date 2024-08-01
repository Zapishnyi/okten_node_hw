import express, { Express, NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { Error } from "mongoose";

import { config } from "./configs/config";
import { jobRunner } from "./crons/cronStack";
import { IAPIError } from "./interfaces/IAPIError";
import { authRouter } from "./routers/auth.router";
import { carRouter } from "./routers/car.router";
import { userRouter } from "./routers/user.router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

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

app.listen(config.APP_PORT, config.APP_HOST, async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log(`server started at port ${config.APP_PORT} `);
  //   Cron job runner:
  jobRunner();
});
