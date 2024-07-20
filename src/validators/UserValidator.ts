import Joi from "joi";

import { regexp } from "../constants/regexp";
import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";
import IUser from "../interfaces/IUser";

class Schema {
  public static name = Joi.string().max(255).min(3).trim();
  public static userName = Joi.string().max(255).min(3).trim();
  public static password = Joi.string()
    .min(8)
    .pattern(regexp.password)
    .trim()
    .messages({
      "string.pattern.base":
        "Password must contain:8 characters in length, at least one uppercase English letter, at least one lowercase English letter, at least one digit, at least one special character ",
    });
  public static age = Joi.number().min(1).max(120);
  public static email = Joi.string().pattern(regexp.email).trim().messages({
    "string.pattern.base": "Must be a valid email address",
  });
  public static phone = Joi.string().pattern(regexp.phone).messages({
    "string.pattern.base": "Must be a valid phone number",
  });
  public static gender = Joi.string().valid(...Object.values(GenderEnum));
  public static role = Joi.string().valid(...Object.values(RoleEnum));

  public userStrict: Joi.ObjectSchema<IUser> = Joi.object({
    name: Schema.name.required(),
    userName: Schema.userName.required(),
    password: Schema.password.required(),
    age: Schema.age.required(),
    email: Schema.email.required(),
    phone: Schema.phone,
    gender: Schema.gender.required(),
    role: Schema.role.required(),
  });
  public userNotStrict: Joi.ObjectSchema<IUser> = Joi.object({
    name: Schema.name,
    userName: Schema.userName,
    password: Schema.password,
    age: Schema.age,
    email: Schema.email,
    phone: Schema.phone,
    gender: Schema.gender,
    role: Schema.role,
  });
}

export const schema = new Schema();
