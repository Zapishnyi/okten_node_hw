import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ReturnDocumentTypeEnum } from "../enums/returnDocumentType.enum";
import { UserOrderByEnum } from "../enums/user-order-by.enum";
import { IPaginated } from "../interfaces/IPaginated";
import { toPresentUser } from "../presenters/presenter";
import { userServices } from "../services/user.service";

class UserController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IPaginated<UserOrderByEnum>;
      res.status(200).json(await userServices.findAll(query));
    } catch (err) {
      next(err);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          toPresentUser(
            await userServices.findOneByParam({ _id: req.params.id }),
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async findMe(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          toPresentUser(
            await userServices.findOneByParam({ _id: res.locals._userId }),
          ),
        );
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
          toPresentUser(
            await userServices.updateOne(
              res.locals._userId,
              req.body,
              ReturnDocumentTypeEnum.After,
              req.files?.avatar as UploadedFile,
              res.locals.user?.avatar,
            ),
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await userServices.deleteOne(req.params.id);
      res.status(200).json(`User with ID ${req.params.id} successful deleted`);
    } catch (err) {
      next(err);
    }
  }

  public async deleteKeysByParams(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      res
        .status(200)
        .json(
          toPresentUser(
            await userServices.deleteKeys(
              res.locals._userId,
              req.query,
              ReturnDocumentTypeEnum.After,
              res.locals.user?.avatar,
            ),
          ),
        );
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
