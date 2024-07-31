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
      res.status(200).json(await authServices.login(res.locals._userId));
    } catch (err) {
      next(err);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          await authServices.verify(
            res.locals._userId,
            { isVerified: true },
            res.locals.token,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authServices.forgotPassword(res.locals.user);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async renewPassword(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          await authServices.renewPassword(
            res.locals._userId,
            req.body,
            res.locals.token,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await authServices.refresh(res.locals._userId, res.locals.token));
    } catch (err) {
      next(err);
    }
  }
  public async log_outCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      await authServices.log_outCurrent(res.locals.token, res.locals._userId);
      res.status(200).json("Logged out successfully");
    } catch (err) {
      next(err);
    }
  }
  public async log_outAll(req: Request, res: Response, next: NextFunction) {
    try {
      await authServices.log_outAll(res.locals._userId);
      res.status(200).json("Logged out successfully from all devices");
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
