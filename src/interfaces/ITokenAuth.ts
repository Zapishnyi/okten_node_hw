export interface ITokenAuth {
  _id?: string;
  access: string;
  refresh: string;
  _userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
