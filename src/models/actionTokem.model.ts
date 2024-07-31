import mongoose from "mongoose";

import { ActionTypeEnum } from "../enums/action-type.enum";
import { ITokenAction } from "../interfaces/ITokenAction";
import { UserModel } from "./user.model";

const { Schema } = mongoose;

const actionTokenSchema = new Schema(
  {
    action: { type: String, required: true },
    type: { type: String, enum: ActionTypeEnum, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionTokenModel = mongoose.model<ITokenAction>(
  "action_tokens",
  actionTokenSchema,
);
