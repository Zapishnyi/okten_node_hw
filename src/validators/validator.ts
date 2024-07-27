import Joi from "joi";

import { regexp } from "../constants/regexp";
import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";
import ICar from "../interfaces/ICar";
import IUser from "../interfaces/IUser";
import IUserLogin from "../interfaces/IUserLogin";

class Schema {
  // user
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
  // car
  public static brand = Joi.string().max(255).trim();
  public static yearBuild = Joi.number()
    .max(new Date().getFullYear())
    .min(1970);
  public static price = Joi.number().min(0);
  public static img = Joi.string().uri().trim();
  public static secondHand = Joi.boolean();

  public auth: Joi.ObjectSchema<IUserLogin> = Joi.object({
    userName: Schema.userName.required(),
    password: Schema.password.required(),
  });

  public userStrict: Joi.ObjectSchema<IUser> = Joi.object({
    name: Schema.name,
    userName: Schema.userName.required(),
    password: Schema.password.required(),
    age: Schema.age,
    email: Schema.email.required(),
    phone: Schema.phone,
    gender: Schema.gender,
    role: Schema.role,
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
  public carStrict: Joi.ObjectSchema<ICar> = Joi.object({
    brand: Schema.brand.required(),
    yearBuild: Schema.yearBuild.required(),
    price: Schema.price.required(),
    img: Schema.img.required(),
    secondHand: Schema.secondHand.required(),
  });
  public carNotStrict: Joi.ObjectSchema<ICar> = Joi.object({
    brand: Schema.brand,
    yearBuild: Schema.yearBuild,
    price: Schema.price,
    img: Schema.img,
    secondHand: Schema.secondHand,
  });
}

export const schema = new Schema();
