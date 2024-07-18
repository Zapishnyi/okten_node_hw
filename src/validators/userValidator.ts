import { ApiError } from "../errors/api.error";
import { IAPIError } from "../models/IAPIError";
import IUser from "../models/IUser";

export const validation = (
  obj: IUser,
  strict: boolean,
): boolean | IAPIError => {
  const strictCheck: (boolean | ApiError)[] = [
    Object.hasOwn(obj, "name") ? true : new ApiError("Name is missing", 400),
    Object.hasOwn(obj, "userName")
      ? true
      : new ApiError("User Name is missing", 400),
    Object.hasOwn(obj, "password")
      ? true
      : new ApiError("Password is missing", 400),
    Object.hasOwn(obj, "age") ? true : new ApiError("Age is missing", 400),
    Object.hasOwn(obj, "email") ? true : new ApiError("Email is missing", 400),
    Object.hasOwn(obj, "gender")
      ? true
      : new ApiError("Gender is missing", 400),
  ];
  const validationModel = [
    {
      name: [
        typeof obj.name === "string"
          ? true
          : new ApiError("Name must be a string", 400),
        obj.name.length >= 3
          ? true
          : new ApiError("Name must be at least 3 literals long", 400),
      ],
    },
    {
      userName: [
        typeof obj.userName === "string"
          ? true
          : new ApiError("User Name must be a string", 400),
        obj.userName.length >= 3
          ? true
          : new ApiError("Name must be at least 3 literals long", 400),
      ],
    },
    {
      password: [
        typeof obj.password === "string"
          ? true
          : new ApiError("User Name must be a string", 400),
        obj.password.length >= 6
          ? true
          : new ApiError("Password must be at least 6 symbol long", 400),
      ],
    },
    {
      age: [
        typeof obj.age === "number"
          ? true
          : new ApiError("Age must be a number", 400),
        obj.age >= 1
          ? true
          : new ApiError("Age must be between 1 and 120 years", 400),
        obj.age < 120
          ? true
          : new ApiError("Age must be between 1 and 120 years", 400),
      ],
    },
    {
      email: [
        typeof obj.email === "string"
          ? true
          : new ApiError("email must be a string", 400),
        obj.email.includes("@")
          ? true
          : new ApiError("Please provide a valid email address", 400),
      ],
    },
    {
      gender: [
        typeof obj.gender === "string"
          ? true
          : new ApiError("gender must be string", 400),
        obj.gender === "male" || obj.gender === "female"
          ? true
          : new ApiError("gender must be male or female", 400),
      ],
    },
  ];

  return strict
    ? strictCheck.reduce((acc, curr, i) =>
        acc === true
          ? curr === true
            ? Object.values(validationModel[i])[0].reduce(
                (
                  a: boolean | ApiError,
                  c: boolean | ApiError,
                ): boolean | ApiError =>
                  a === true ? (c === true ? true : c) : a,
              )
            : curr
          : acc,
      )
    : validationModel
        .filter((e) => Object.keys(obj).includes(Object.keys(e)[0]))
        .reduce(
          (acc, curr) =>
            acc === true
              ? Object.values(curr).reduce((a, c) =>
                  a === true ? (c === true ? true : c) : a,
                )
              : acc,
          true,
        );
};
