import Joi from "joi";

import { regexp } from "../constants/regexp";
import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";
import {
  IUserEmail,
  IUserLogin,
  IUserNonSensitive,
  IUserPasswordReNew,
  IUserRole,
  IUserSingUp,
} from "../interfaces/IUser";

export class validUser {
  // user
  private static name = Joi.string().max(255).min(3).trim();
  private static userName = Joi.string().max(255).min(3).trim();
  private static password = Joi.string()
    .min(8)
    .pattern(regexp.password)
    .trim()
    .messages({
      "string.pattern.base":
        "Password must contain:8 characters in length, at least one uppercase English letter, at least one lowercase English letter, at least one digit, at least one special character ",
    });
  private static age = Joi.number().min(1).max(120);
  private static email = Joi.string().pattern(regexp.email).trim().messages({
    "string.pattern.base": "Must be a valid email address",
  });
  private static phone = Joi.string().pattern(regexp.phone).messages({
    "string.pattern.base": "Must be a valid phone number",
  });
  private static gender = Joi.string().valid(...Object.values(GenderEnum));
  private static role = Joi.string().valid(...Object.values(RoleEnum));

  public static login: Joi.ObjectSchema<IUserLogin> = Joi.object({
    userName: this.userName.required(),
    password: this.password.required(),
  });
  public static emailCheck: Joi.ObjectSchema<IUserEmail> = Joi.object({
    email: this.email.required(),
  });
  public static passwordCheck: Joi.ObjectSchema<IUserPasswordReNew> =
    Joi.object({
      password: this.password.required(),
    });

  public static singUp: Joi.ObjectSchema<IUserSingUp> = Joi.object({
    userName: this.userName.required(),
    password: this.password.required(),
    email: this.email.required(),
  });

  public static roleOnly: Joi.ObjectSchema<IUserRole> = Joi.object({
    role: this.role.required(),
  });

  public static userUpdate: Joi.ObjectSchema<IUserNonSensitive> = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
    gender: this.gender,
  });
}
