import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { read, write } from "../repositories/user.repository";
import { validation } from "../validators/userValidator";

class UserController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const fileContent = await read();
      res.status(200).json(fileContent);
    } catch (err) {
      next(err);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      if (Number.isInteger(+req.params.userId)) {
        const fileContent = await read();
        const foundUser = fileContent.find((e) => e.id === +req.params.userId);
        if (!foundUser) {
          throw new ApiError(
            `User with ID: ${req.params.userId} wasn't found in database`,
            404,
          );
        } else {
          res.status(200).json(foundUser);
        }
      } else {
        throw new ApiError("Wrong params", 400);
      }
    } catch (err) {
      next(err);
    }
  }

  public async addOne(req: Request, res: Response, next: NextFunction) {
    const { name, userName, password, age, email, gender } = req.body;
    try {
      const validationResult = validation(req.body, true);
      if (validationResult === true) {
        // Is "user already exist" check
        let checkMarker = true;
        const fileContent = await read();
        fileContent.forEach((e) => {
          if (
            e.name === name ||
            e.userName === userName ||
            e.password === password ||
            e.email === password
          ) {
            checkMarker = false;
          }
        });
        if (checkMarker) {
          fileContent.push({
            id: fileContent.length
              ? fileContent[fileContent.length - 1].id + 1
              : 1,
            name,
            userName,
            password,
            age,
            email,
            gender,
          });
          await write(fileContent);
          res.status(201).json(fileContent[fileContent.length - 1]);
        } else {
          throw new ApiError(
            "User with entered credentials already exist ",
            400,
          );
        }
      } else {
        throw validationResult;
      }
    } catch (err) {
      next(err);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    try {
      if (Number.isInteger(+user.userId)) {
        const validationResult = validation(req.body, false);
        if (validationResult) {
          const fileContent = await read();
          const indexOfUser = fileContent.findIndex(
            (e) => e.id === +req.params.userId,
          );
          if (indexOfUser !== -1) {
            const oldUser = fileContent.find(
              (e) => e.id === +req.params.userId,
            );
            const newUser = { ...oldUser, ...user };
            fileContent.splice(indexOfUser, 1, {
              id: +req.params.userId,
              name: newUser.name,
              userName: newUser.userName,
              password: newUser.password,
              age: newUser.age,
              email: newUser.email,
              gender: newUser.gender,
            });
            write(fileContent);
            res.status(200).json(fileContent[indexOfUser]);
          } else {
            throw new ApiError(
              `There is no User with ID: ${req.params.userId} in database`,
              404,
            );
          }
        } else {
          throw validationResult;
        }
      } else {
        throw new ApiError("ID must be a number", 400);
      }
    } catch (err) {
      next(err);
    }
  }

  public async replaceOne(req: Request, res: Response, next: NextFunction) {
    try {
      if (Number.isInteger(+req.params.userId)) {
        const user = req.body;
        const validationResult = validation(user, true);
        if (validationResult) {
          const fileContent = await read();
          const indexOfUser = fileContent.findIndex(
            (e) => e.id === +req.params.userId,
          );
          if (indexOfUser !== -1) {
            fileContent.splice(indexOfUser, 1, {
              id: +req.params.userId,
              name: user.name,
              userName: user.userName,
              password: user.password,
              age: user.age,
              email: user.email,
              gender: user.gender,
            });
            await write(fileContent);
            res.status(200).json(fileContent[indexOfUser]);
          } else {
            throw new ApiError(
              `There is no User with ID: ${req.params.userId} in database`,
              404,
            );
          }
        } else {
          throw validationResult;
        }
      } else {
        throw new ApiError("ID must be a number", 400);
      }
    } catch (err) {
      next(err);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      if (Number.isInteger(+req.params.userId)) {
        const fileContent = await read();
        const indexOfUser = fileContent.findIndex(
          (e) => e.id === +req.params.userId,
        );
        if (indexOfUser !== -1) {
          fileContent.splice(indexOfUser, 1);
          await write(fileContent);
          res.status(200).json({
            message: `User with ID ${req.params.userId} successful deleted`,
          });
        } else {
          throw new ApiError(
            `There is no User with ID: ${req.params.userId} in database`,
            404,
          );
        }
      } else {
        throw new ApiError("ID must be a number", 400);
      }
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
