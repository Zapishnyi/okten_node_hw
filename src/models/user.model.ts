import mongoose from "mongoose";

import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";
import IUser from "../interfaces/IUser";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: false },
    gender: { type: String, enum: GenderEnum, required: true },
    role: {
      type: String,
      enum: RoleEnum,
      required: true,
      default: RoleEnum.User,
    },
    isVerified: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = mongoose.model<IUser>("users", userSchema);
