import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { schema } from "../validators/UserValidator";

class Validation {
  public id(id: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[id])) {
          throw new ApiError("Invalid Id", 400);
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  public userStrict(strict: boolean) {
    const validationSchema = strict ? schema.userStrict : schema.userNotStrict;
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await validationSchema.validateAsync(req.body);
        next();
      } catch (err) {
        const error = err as ValidationError;
        next(new ApiError(error.details[0].message, 400));
      }
    };
  }
}

export const validation = new Validation();
