import mongoose from "mongoose";

import { GenderEnum } from "../enums/gender.enum";
import { RoleEnum } from "../enums/role.enums";
import { IUserUpdated } from "../interfaces/IUser";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    userName: { type: String, require: false, unique: true },
    password: { type: String, required: false },
    age: { type: Number, required: false },
    email: { type: String, require: false, unique: true },
    phone: { type: String, require: false },
    gender: { type: String, enum: GenderEnum, required: false },
    role: {
      type: String,
      enum: RoleEnum,
      required: false,
      default: RoleEnum.User,
    },
    isVerified: { type: Boolean, require: false, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = mongoose.model<IUserUpdated>("users", userSchema);
