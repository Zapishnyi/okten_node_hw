import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";

export interface IUser {
  _id?: string;
  userName: string;
  password: string;
  email: string;
  role: RoleEnum;
  name: string;
  age: number;
  phone: string;
  gender: GenderEnum;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserUpdate
  extends Partial<
    Pick<
      IUser,
      | "userName"
      | "password"
      | "email"
      | "name"
      | "age"
      | "gender"
      | "phone"
      | "isVerified"
      | "role"
    >
  > {}

export interface IUserUpdated extends Required<IUser> {}

export interface IUserLogin extends Pick<IUser, "userName" | "password"> {}
export interface IUserEmail extends Pick<IUser, "email"> {}

export interface IUserSingUp
  extends Pick<IUser, "userName" | "password" | "email"> {}

export interface IUserNonSensitive
  extends Partial<Pick<IUser, "name" | "age" | "gender" | "phone">> {}

export interface IUserPasswordReNew extends Pick<IUser, "password"> {}
export interface IUserVerify extends Pick<IUser, "isVerified"> {}

export interface IUserRole extends Pick<IUser, "role"> {}
