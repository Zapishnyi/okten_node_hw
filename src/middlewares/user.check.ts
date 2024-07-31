import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enums";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/IUser";
import { userServices } from "../services/user.service";

class UserCheck {
  public role() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const _userId = res.locals._userId;
        const role: RoleEnum | undefined = (
          (await userServices.findOneById(_userId)) as IUser
        ).role;
        if (req.params.id) {
          if (req.params.id !== _userId && role !== "admin") {
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
