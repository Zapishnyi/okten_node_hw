import { OrderEnum } from "../enums/order.enum";

export interface IPaginated<K> {
  limit: number;
  page: number;
  order: OrderEnum;
  orderBy: K;
  search?: string | undefined;
}

export interface IPaginationResult<T, K> extends IPaginated<K> {
  total: number;
  data: T[];
}
