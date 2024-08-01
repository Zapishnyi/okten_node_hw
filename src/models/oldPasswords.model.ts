import mongoose from "mongoose";

import { IOldPasswordUpdated } from "../interfaces/IOldPassword";
import { UserModel } from "./user.model";

const { Schema } = mongoose;

const oldPasswordsSchema = new Schema(
  {
    password: { type: String, required: true, unique: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const oldPasswordModel = mongoose.model<IOldPasswordUpdated>(
  "old_passwords",
  oldPasswordsSchema,
);
