export interface ITokenAuth {
  _id?: string;
  access: string;
  refresh: string;
  _userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITokenAuthUpdate extends Partial<ITokenAuth> {}
export interface ITokenAuthUpdated extends Required<ITokenAuth> {}
