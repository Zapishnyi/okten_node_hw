import { NextFunction, Request, Response } from "express";

import { authServices } from "../services/auth.service";

class AuthController {
  public async singUp(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await authServices.singUp(req.body));
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await authServices.login(res.locals.userId));
    } catch (err) {
      next(err);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          await authServices.refresh(
            res.locals.userId.userId,
            res.locals.token,
          ),
        );
    } catch (err) {
      next(err);
    }
  }
  public async log_outCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await authServices.log_outCurrent(req.res?.locals.token));
    } catch (err) {
      next(err);
    }
  }
  public async log_outAll(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await authServices.log_outAll(req.res?.locals.userId));
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
