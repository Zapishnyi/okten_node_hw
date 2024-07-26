import { GenderEnum } from "../enums/gender.enum";

export default interface IUserNonSensitive {
  name?: string;
  age?: number;
  phone?: string;
  gender?: GenderEnum;
}
