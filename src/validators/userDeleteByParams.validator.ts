import Joi from "joi";

import { IUserDeleteKeys } from "../interfaces/IUser";

export class validUserDelete {
  private static name = Joi.any();
  private static age = Joi.any();
  private static phone = Joi.any();
  private static gender = Joi.any();
  private static avatar = Joi.any();

  public static keysDelete: Joi.ObjectSchema<IUserDeleteKeys> = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
    gender: this.gender,
    avatar: this.avatar,
  });
}
