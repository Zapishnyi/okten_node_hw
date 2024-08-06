import { ICar } from "../interfaces/ICar";
import { IUser } from "../interfaces/IUser";
import { ApiError } from "./api.error";

export const noFoundCheck = (payload: string, result: IUser | ICar | null) => {
  if (!result) {
    throw new ApiError(`Record: ${payload} is not found`, 404);
  }
};
