import mongoose from "mongoose";

import { ITokenAuth } from "../interfaces/ITokenAuth";
import { UserModel } from "./user.model";

const { Schema } = mongoose;

const authTokenSchema = new Schema(
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

export const AuthTokenModel = mongoose.model<ITokenAuth>(
  "auth_tokens",
  authTokenSchema,
);
