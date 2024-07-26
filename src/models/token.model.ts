import mongoose from "mongoose";

import { IToken } from "../interfaces/IToken";
import { UserModel } from "./user.model";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    access: { type: String, required: true },
    refresh: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TokenModel = mongoose.model<IToken>("tokens", userSchema);
