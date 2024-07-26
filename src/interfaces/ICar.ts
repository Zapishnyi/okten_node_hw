import { Schema } from "mongoose";

export default interface ICar {
  _id?: Schema.Types.ObjectId;
  brand: string;
  yearBuild: number;
  price: number;
  img: string;
  secondHand: boolean;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
