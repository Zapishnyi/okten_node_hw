import { ActionTypeEnum } from "../enums/actionType.enum";

export interface ITokenAction {
  _id?: string;
  action: string;
  type: ActionTypeEnum;
  _userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
