import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { ApiError } from "../errors/api.error";
import { IPayloadForToken } from "../interfaces/IPayloadForToken";
import { IUserUpdated } from "../interfaces/IUser";
import { hashService } from "../services/hash.service";
import { tokenServices } from "../services/token.service";
import { userServices } from "../services/user.service";

class AuthCheck {
  public passwordCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user: IUserUpdated | null = await userServices.findOneByParam({
          userName: req.body.userName,
        });
        if (user) {
          res.locals._userId = user._id.toString();
          if (
            !(await hashService.compare(await req.body.password, user.password))
          ) {
            throw new ApiError("Invalid credentials", 401);
          }
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }
  public emailCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const email = req.body.email;
        const user: IUserUpdated | null = await userServices.findOneByParam({
          email,
        });
        if (!user?.isVerified) {
          throw new Error();
        }
        res.locals.user = user;
        next();
      } catch (err) {
        next(new ApiError("", 204));
      }
    };
  }

  public tokenCheck(tokenType: TokenEnumList) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(" ").pop();
        if (!token) {
          throw new ApiError("Token is missing.", 401);
        } else {
          res.locals._userId = (
            (await tokenServices.checkToken(
              token,
              tokenType,
            )) as unknown as IPayloadForToken
          )._userId;
          res.locals.token = token;
        }
        next();
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          err = new ApiError(err.message, 401);
        }
        next(err);
      }
    };
  }
}

export const auth = new AuthCheck();
