import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";

export default interface IUser {
  _id?: string;
  name: string;
  userName: string;
  password: string;
  age: number;
  email: string;
  phone?: string;
  gender: GenderEnum;
  role: RoleEnum;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  // eslint-disable-next-line prettier/prettier,semi
};
