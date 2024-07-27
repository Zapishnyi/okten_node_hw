import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

import { RoleEnum } from "../enums/role.enums";
import { ApiError } from "../errors/api.error";
import ICar from "../interfaces/ICar";
import IUser from "../interfaces/IUser";
import { carServices } from "../services/car.service";
import { userServices } from "../services/user.service";
import { schema } from "../validators/validator";

class CarCheck {
  public validation(strict: boolean) {
    const validationSchema = strict ? schema.carStrict : schema.carNotStrict;
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
        const ownerId = ((await carServices.findOne(req.params.id)) as ICar)
          .ownerId;
        const userId = res.locals.userId;
        const role: RoleEnum | undefined = (
          (await userServices.findOne(userId)) as IUser
        ).role;
        if (ownerId !== userId && role !== "admin") {
          throw new ApiError("You have no rights to change this resource", 403);
        }
      } catch (err) {
        next(err);
      }
    };
  }
}

export const carCheck = new CarCheck();
