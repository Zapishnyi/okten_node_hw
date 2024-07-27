import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

import { RoleEnum } from "../enums/role.enums";
import { ApiError } from "../errors/api.error";
import IUser from "../interfaces/IUser";
import { userServices } from "../services/user.service";
import { schema } from "../validators/validator";

class UserCheck {
  public validation(strict: boolean) {
    const validationSchema = strict ? schema.userStrict : schema.userNotStrict;
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
  public role() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = res.locals.userId;
        const role: RoleEnum | undefined = (
          (await userServices.findOne(userId)) as IUser
        ).role;
        if (req.params.id) {
          if (req.params.id !== userId && role !== "admin") {
            throw new ApiError("Forbidden", 403);
          }
        } else {
          if (role !== "admin") {
            throw new ApiError("Forbidden", 403);
          }
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export const userCheck = new UserCheck();
