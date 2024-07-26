import mongoose from "mongoose";

import ICar from "../interfaces/ICar";
import { UserModel } from "./user.model";

const { Schema } = mongoose;

const carsSchema = new Schema(
  {
    brand: { type: String, required: true },
    yearBuild: { type: String, require: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    secondHand: { type: Boolean, required: true },
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CarModel = mongoose.model<ICar>("cars", carsSchema);
