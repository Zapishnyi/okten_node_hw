import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { schemaModel } from "../enums/schemaModel.enum";
import { ApiError } from "../errors/api.error";
import { schema } from "../validators/validator";

class UserCarCheck {
  public id() {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        if (!isObjectIdOrHexString(req.params.id)) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }
  public userOrCar(strict: boolean, model: schemaModel) {
    const validationSchema = strict
      ? schema[`${model}Strict`]
      : schema[`${model}NotStrict`];
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await validationSchema.validateAsync(req.body);
        next();
      } catch (err) {
        const error = err as ValidationError;
        next(new ApiError(error.message, 400));
      }
    };
  }
  public userRoleCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.params.id !== req.res?.locals.id) {
          throw new ApiError("Forbidden", 403);
        }
      } catch (err) {
        next(err);
      }
    };
  }
}

export const validation = new UserCarCheck();
