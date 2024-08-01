import { FilterQuery } from "mongoose";

import { ReturnDocumentTypeEnum } from "../enums/returnDocumentType.enum";
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
  public async findOneByParam(
    param: FilterQuery<IUserUpdate>,
  ): Promise<IUserUpdated | null> {
    return await userRepository.findOneByParam(param);
  }

  public async findManyByParam(
    param: FilterQuery<IUserUpdate>,
  ): Promise<IUserUpdated[] | null> {
    return await userRepository.findManyByParam(param);
  }

  public async createOne(newUser: IUserSingUp): Promise<IUser> {
    return await userRepository.createOne(newUser);
  }

  public async updateOne(
    userId: string,
    dto: IUserUpdate,
    returnType: ReturnDocumentTypeEnum,
  ): Promise<IUserUpdated | null> {
    return await userRepository.updateOne(userId, dto, returnType);
  }

  // public async replaceOne(userId: string, dto: IUser): Promise<IUser | null> {
  //   return await userRepository.replaceOne(userId, dto);
  // }

  public async deleteOne(userId: string): Promise<IUser | null> {
    return await userRepository.deleteOne(userId);
  }
}

export const userServices = new UserServices();
