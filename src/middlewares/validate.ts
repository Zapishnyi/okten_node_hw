import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";

import { ApiError } from "../errors/api.error";

class Validate {
  public validateBody(validationSchema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validationSchema.validateAsync(req.body);
        next();
      } catch (err) {
        const error = err as ValidationError;
        next(new ApiError(error.message, 400));
      }
    };
  }
  public validateQuery(validationSchema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = await validationSchema.validateAsync(req.query);
        next();
      } catch (err) {
        const error = err as ValidationError;
        next(new ApiError(error.message, 400));
      }
    };
  }
}

export const { validateQuery, validateBody } = new Validate();
