import express, { Express, NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { routs } from "./constants/routs";
import { ApiError } from "./errors/api.error";
import { carRouter } from "./routers/car.router";
import { userRouter } from "./routers/user.router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routs.users, userRouter);
app.use(routs.cars, carRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
  },
);

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception error:", err.message, err.stack);
  process.exit(1);
});

app.listen(config.APP_PORT, config.APP_HOST, async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log(`server started at port ${config.APP_PORT} `);
});
