import Joi from "joi";

import { CarOrderByEnum } from "../enums/car-order-by.enum";
import { OrderEnum } from "../enums/order.enum";
import { UserOrderByEnum } from "../enums/user-order-by.enum";
import { IUserDeleteKeys } from "../interfaces/IUser";

export class validPagination {
  private static limit = Joi.number().min(1).max(100).default(10);
  private static page = Joi.number().min(1).default(1);
  private static search = Joi.any();
  private static order = Joi.string()
    .valid(...Object.values(OrderEnum))
    .default(OrderEnum.ASC);
  private static orderBy = Joi.string().default(UserOrderByEnum.USER_NAME);

  public static searchQueryUser: Joi.ObjectSchema<IUserDeleteKeys> = Joi.object(
    {
      limit: this.limit,
      page: this.page,
      search: this.search,
      order: this.order,
      orderBy: this.orderBy.default(UserOrderByEnum.USER_NAME),
    },
  );
  public static searchQueryCar: Joi.ObjectSchema<IUserDeleteKeys> = Joi.object({
    limit: this.limit,
    page: this.page,
    search: this.search,
    order: this.order,
    orderBy: this.orderBy.default(CarOrderByEnum.BRAND),
  });
}
