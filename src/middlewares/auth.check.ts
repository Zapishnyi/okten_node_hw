import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { TokenExpiredError } from "jsonwebtoken";

import { ApiError } from "../errors/api.error";
import IUserFull from "../interfaces/IUserFull";
import { tokenRepository } from "../repositories/tokenrepository";
import { hashService } from "../services/hash.service";
import { tokenServices } from "../services/token.service";
import { userServices } from "../services/user.service";
import { schema } from "../validators/validator";

class AuthCheck {
  public passwordCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user: IUserFull | null = await userServices.findOneByUserName(
          req.body.userName,
        );
        res.locals.userId = user?._id;
        if (
          !(await hashService.compare(
            await req.body.password,
            user?.password || "",
          ))
        ) {
          throw new ApiError("Invalid credentials", 401);
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }
  public credentialsValidation() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.auth.validateAsync(req.body);
        next();
      } catch (err) {
        const error = err as ValidationError;
        next(new ApiError(error.message, 400));
      }
    };
  }
  public accessTokenCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
          throw new ApiError("Not authorized", 401);
        } else {
          res.locals.userId = tokenServices.checkAccessToken(accessToken);
        }
        console.log("Locals", res.locals);
        next();
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          err = new ApiError(err.message, 401);
        }
        next(err);
      }
    };
  }

  public refreshTokenCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const refreshToken = req.headers.authorization?.split(" ")[1];
        if (!refreshToken) {
          throw new ApiError("Not authorized", 401);
        } else {
          res.locals.userId = tokenServices.checkRefreshToken(refreshToken);
          res.locals.token = refreshToken;
          console.log("Refresh local storage", res.locals.userId);
          await tokenRepository.findOne(refreshToken);
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
