import express, { Express, NextFunction, Request, Response } from "express";

import { port } from "./constants/port";
import { users } from "./constants/urls";
import { ApiError } from "./errors/api.error";
import { userRouter } from "./routers/user.router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(users.base, userRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json(err.message);
  },
);

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception error:", err.message, err.stack);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`server started at port ${port} `);
});
