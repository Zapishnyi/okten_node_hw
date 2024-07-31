import {
  IUser,
  IUserSingUp,
  IUserUpdate,
  IUserUpdated,
} from "../interfaces/IUser";
import { userRepository } from "../repositories/user.repository";

class UserServices {
  public async findAll(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  public async findOneById(userId: string): Promise<IUser | null> {
    return await userRepository.findOneById(userId);
  }
  public async findOneByParam(param: {
    [key: string]: string;
  }): Promise<IUserUpdated | null> {
    return await userRepository.findByParam(param);
  }

  public async createOne(newUser: IUserSingUp): Promise<IUser> {
    return await userRepository.createOne(newUser);
  }

  public async updateOne(
    userId: string,
    dto: IUserUpdate,
  ): Promise<IUserUpdated | null> {
    return await userRepository.updateOne(userId, dto);
  }

  // public async replaceOne(userId: string, dto: IUser): Promise<IUser | null> {
  //   return await userRepository.replaceOne(userId, dto);
  // }

  public async deleteOne(userId: string): Promise<IUser | null> {
    return await userRepository.deleteOne(userId);
  }
}

export const userServices = new UserServices();
