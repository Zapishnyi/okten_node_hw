import IUser from "../models/IUser";

export const ifUserExist = (fileContent: IUser[], newUser: IUser) =>
  fileContent.reduce(
    (a: boolean, c: IUser) =>
      a
        ? c.name === newUser.name ||
          c.userName === newUser.userName ||
          c.password === newUser.password ||
          c.email === newUser.password
          ? false
          : true
        : false,
    true,
  );
