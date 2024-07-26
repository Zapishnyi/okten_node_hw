import ICar from "../interfaces/ICar";
import IUserFull from "../interfaces/IUserFull";
import { ApiError } from "./api.error";

export const noIdFoundCheck = (
  payload: string,
  result: IUserFull | ICar | null,
) => {
  if (!result) {
    throw new ApiError(`User: ${payload} is not found`, 404);
  }
};
