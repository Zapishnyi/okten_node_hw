import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enums";
import { ApiError } from "../errors/api.error";
import { userServices } from "../services/user.service";

class UserCheck {
  public role() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const _userId = res.locals._userId;
        const user = await userServices.findOneById(_userId);
        if (req.params.id !== _userId && user?.role === RoleEnum.User) {
          throw new ApiError("Forbidden", 403);
        }

        res.locals.user = user;
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export const userCheck = new UserCheck();
