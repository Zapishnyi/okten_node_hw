import ICar from "../interfaces/ICar";
import IUser from "../interfaces/IUser";
import { ApiError } from "./api.error";

export const noIdFoundCheck = (
  payload: string,
  result: IUser | ICar | null,
) => {
  if (!result) {
    throw new ApiError(`Record with ID: ${payload} is not found`, 404);
  }
};
