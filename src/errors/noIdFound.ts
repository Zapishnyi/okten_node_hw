import ICar from "../interfaces/ICar";
import IUser from "../interfaces/IUser";
import { ApiError } from "./api.error";

export const noIdFoundCheck = (id: string, result: IUser | ICar | null) => {
  if (!result) {
    throw new ApiError(`User with ID ${id} is not found`, 404);
  }
};
