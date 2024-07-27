import { RoleEnum } from "../enums/role.enums";
import IUserNonSensitive from "./IUserNonSensitive";

export default interface IUserNoID extends IUserNonSensitive {
  userName: string;
  password: string;
  email: string;
  role?: RoleEnum;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
