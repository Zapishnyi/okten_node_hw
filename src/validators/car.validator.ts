import Joi from "joi";

import { ICarCreate, ICarUpdate } from "../interfaces/ICar";

export class validCar {
  private static brand = Joi.string().max(255).trim();
  private static yearBuild = Joi.number()
    .max(new Date().getFullYear())
    .min(1970);
  private static price = Joi.number().min(0);
  private static img = Joi.string().uri().trim();
  private static secondHand = Joi.boolean();

  public static create: Joi.ObjectSchema<ICarCreate> = Joi.object({
    brand: this.brand.required(),
    yearBuild: this.yearBuild.required(),
    price: this.price.required(),
    img: this.img.required(),
    secondHand: this.secondHand.required(),
  });
  public static update: Joi.ObjectSchema<ICarUpdate> = Joi.object({
    brand: this.brand,
    yearBuild: this.yearBuild,
    price: this.price,
    img: this.img,
    secondHand: this.secondHand,
  });
}
