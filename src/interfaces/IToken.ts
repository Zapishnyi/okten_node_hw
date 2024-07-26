import { Schema } from "mongoose";

export interface IToken {
  _id?: Schema.Types.ObjectId;
  access: string;
  refresh: string;
  _userId?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
