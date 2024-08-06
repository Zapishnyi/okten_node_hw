import { NextFunction, Request, Response } from "express";

import { ReturnDocumentTypeEnum } from "../enums/returnDocumentType.enum";
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
      res
        .status(200)
        .json(await userServices.findOneByParam({ _id: req.params.id }));
    } catch (err) {
      next(err);
    }
  }

  public async findMe(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await userServices.findOneByParam({ _id: res.locals._userId }));
    } catch (err) {
      next(err);
    }
  }

  public async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await userServices.createOne(req.body));
    } catch (err) {
      next(err);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          await userServices.updateOne(
            res.locals._userId,
            req.body,
            ReturnDocumentTypeEnum.After,
          ),
        );
    } catch (err) {
      next(err);
    }
  }
  //
  // public async replaceOne(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     res
  //       .status(200)
  //       .json(await userServices.replaceOne(req.params.id, req.body));
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  //
  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await userServices.deleteOne(req.params.id);
      res.status(200).json(`User with ID ${req.params.id} successful deleted`);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
