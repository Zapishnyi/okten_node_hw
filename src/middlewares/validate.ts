import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";

import { ApiError } from "../errors/api.error";

class Validate {
  public validate(validationSchema: ObjectSchema) {
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
}

export const { validate } = new Validate();
