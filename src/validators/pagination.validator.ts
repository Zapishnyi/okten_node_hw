import Joi from "joi";

import { CarOrderByEnum } from "../enums/car-order-by.enum";
import { OrderEnum } from "../enums/order.enum";
import { UserOrderByEnum } from "../enums/user-order-by.enum";
import { IPaginated } from "../interfaces/IPaginated";

export class validPagination {
  private static limit = Joi.number().min(1).max(100).default(10);
  private static page = Joi.number().min(1).default(1);
  private static search = Joi.any();
  private static order = Joi.string()
    .valid(...Object.values(OrderEnum))
    .default(OrderEnum.ASC);
  private static orderBy = Joi.string().default(UserOrderByEnum.USER_NAME);

  public static searchQueryUser: Joi.ObjectSchema<IPaginated<UserOrderByEnum>> =
    Joi.object({
      limit: this.limit,
      page: this.page,
      search: this.search,
      order: this.order,
      orderBy: this.orderBy
        .valid(...Object.values(UserOrderByEnum))
        .default(UserOrderByEnum.USER_NAME),
    });
  public static searchQueryCar: Joi.ObjectSchema<IPaginated<CarOrderByEnum>> =
    Joi.object({
      limit: this.limit,
      page: this.page,
      search: this.search,
      order: this.order,
      orderBy: this.orderBy
        .valid(...Object.values(CarOrderByEnum))
        .default(CarOrderByEnum.BRAND),
    });
}
