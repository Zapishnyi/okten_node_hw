import IUserNoID from "./IUserNoID";

export default interface IUser extends IUserNoID {
  _id: string;
}
