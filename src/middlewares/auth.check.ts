import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { TokenExpiredError } from "jsonwebtoken";

import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/ITokenPayload";
import IUser from "../interfaces/IUser";
import { hashService } from "../services/hash.service";
import { tokenServices } from "../services/token.service";
import { userServices } from "../services/user.service";
import { schema } from "../validators/validator";

class AuthCheck {
  public passwordCheck() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user: IUser | null = await userServices.findOneByUserName(
          req.body.userName,
        );
        res.locals.userId = user?._id.toString();
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

  public tokenCheck(tokenType: TokenEnumList) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          throw new ApiError("Authentication token is missing.", 401);
        } else {
          res.locals.userId = (
            (await tokenServices.checkToken(
              token,
              tokenType,
            )) as unknown as ITokenPayload
          ).userId;
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
