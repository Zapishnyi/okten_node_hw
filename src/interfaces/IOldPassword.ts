export interface IOldPassword {
  _id?: string;
  password: string;
  _userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOldPasswordUpdated extends Required<IOldPassword> {}
