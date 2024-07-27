import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class IdCheck {
  public idCheck() {
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
}

export const { idCheck } = new IdCheck();
