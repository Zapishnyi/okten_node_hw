import { NextFunction, Request, Response } from "express";

import { userServices } from "../services/user.service";

class UserController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await userServices.findAll());
    } catch (err) {
      next(err);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await userServices.findOne(req.params.userId));
    } catch (err) {
      next(err);
    }
  }

  public async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await userServices.addOne(req.body));
    } catch (err) {
      next(err);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await userServices.updateOne(req.params.userId, req.body));
    } catch (err) {
      next(err);
    }
  }

  public async replaceOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await userServices.replaceOne(req.params.userId, req.body));
    } catch (err) {
      next(err);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await userServices.deleteOne(req.params.userId);
      res.status(200).json({
        message: `User with ID ${req.params.userId} successful deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
