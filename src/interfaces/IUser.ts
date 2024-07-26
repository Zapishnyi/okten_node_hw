import { Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enums";
import IUserNonSensitive from "./IUserNonSensitive";

export default interface IUser extends IUserNonSensitive {
  _id: Schema.Types.ObjectId;
  userName: string;
  password: string;
  email: string;
  role?: RoleEnum;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
