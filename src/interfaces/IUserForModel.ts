import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";

export default interface IUserForModel {
  _id?: string;
  name?: string;
  age?: number;
  phone?: string;
  gender?: GenderEnum;
  userName?: string;
  password?: string;
  email?: string;
  role?: RoleEnum;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
