export interface ITokenAuth {
  _id?: string;
  access: string;
  refresh: string;
  _userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITokenAuthUpdate
  extends Partial<
    Pick<
      ITokenAuth,
      "updatedAt" | "_id" | "_userId" | "refresh" | "access" | "createdAt"
    >
  > {}
