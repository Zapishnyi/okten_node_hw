import { ApiError } from "../errors/api.error";
import IUser from "../models/IUser";
import { read, write } from "../repositories/user.repository";
import { ifUserExist } from "../validators/ifUserExist";
import { validation } from "../validators/userValidator";

class UserServices {
  public async findAll() {
    return await read();
  }

  public async findOne(userId: string) {
    if (Number.isInteger(+userId)) {
      const fileContent = await read();
      const foundUser = fileContent.find((e) => e.id === +userId);
      if (foundUser) {
        return foundUser;
      } else {
        throw new ApiError(
          `User with ID: ${userId} wasn't found in database`,
          404,
        );
      }
    } else {
      throw new ApiError("Wrong params", 400);
    }
  }

  public async addOne(newUser: IUser) {
    const { name, userName, password, age, email, gender } = newUser;
    const validationResult = validation(newUser, true);
    if (validationResult === true) {
      const fileContent = await read();
      if (ifUserExist(fileContent, newUser)) {
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
        return fileContent[fileContent.length - 1];
      } else {
        throw new ApiError("User with entered credentials already exist ", 400);
      }
    } else {
      throw validationResult;
    }
  }

  public async updateOne(userId: string, newUser: IUser) {
    if (Number.isInteger(+userId)) {
      const validationResult = validation(newUser, false);
      if (validationResult) {
        const fileContent = await read();
        const indexOfUser = fileContent.findIndex((e) => e.id === +userId);
        if (indexOfUser !== -1) {
          const oldUser = fileContent.find((e) => e.id === +userId);
          const newUserUpdated = { ...oldUser, ...newUser };
          fileContent.splice(indexOfUser, 1, {
            id: +userId,
            name: newUserUpdated.name,
            userName: newUserUpdated.userName,
            password: newUserUpdated.password,
            age: newUserUpdated.age,
            email: newUserUpdated.email,
            gender: newUserUpdated.gender,
          });
          write(fileContent);
          return fileContent[indexOfUser];
        } else {
          throw new ApiError(
            `There is no User with ID: ${userId} in database`,
            404,
          );
        }
      } else {
        throw validationResult;
      }
    } else {
      throw new ApiError("ID must be a number", 400);
    }
  }

  public async replaceOne(userId: string, newUser: IUser) {
    if (Number.isInteger(+userId)) {
      const validationResult = validation(newUser, true);
      if (validationResult) {
        const fileContent = await read();
        const indexOfUser = fileContent.findIndex((e) => e.id === +userId);
        if (indexOfUser !== -1) {
          fileContent.splice(indexOfUser, 1, {
            id: +userId,
            name: newUser.name,
            userName: newUser.userName,
            password: newUser.password,
            age: newUser.age,
            email: newUser.email,
            gender: newUser.gender,
          });
          await write(fileContent);
          return fileContent[indexOfUser];
        } else {
          throw new ApiError(
            `There is no User with ID: ${userId} in database`,
            404,
          );
        }
      } else {
        throw validationResult;
      }
    } else {
      throw new ApiError("ID must be a number", 400);
    }
  }

  public async deleteOne(userId: string) {
    if (Number.isInteger(+userId)) {
      const fileContent = await read();
      const indexOfUser = fileContent.findIndex((e) => e.id === +userId);
      if (indexOfUser !== -1) {
        fileContent.splice(indexOfUser, 1);
        await write(fileContent);
      } else {
        throw new ApiError(
          `There is no User with ID: ${userId} in database`,
          404,
        );
      }
    } else {
      throw new ApiError("ID must be a number", 400);
    }
  }
}

export const userServices = new UserServices();
