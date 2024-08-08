import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";

import { ImageDirectoryNameEnum } from "../enums/image-directory-name.enum";
import { ReturnDocumentTypeEnum } from "../enums/returnDocumentType.enum";
import {
  IUser,
  IUserDeleteKeys,
  IUserSingUp,
  IUserUpdate,
  IUserUpdated,
} from "../interfaces/IUser";
import { authTokenRepository } from "../repositories/auth_token.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

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
    _userId: string,
    dto: IUserUpdate,
    returnType: ReturnDocumentTypeEnum,
    avatar?: UploadedFile,
    oldAvatar?: string,
  ): Promise<IUserUpdated | null> {
    if (avatar) {
      if (oldAvatar) {
        await s3Service.deleteFile(oldAvatar);
      }
      const avatarPath = await s3Service.uploadFile(
        ImageDirectoryNameEnum.avatar,
        _userId,
        avatar,
      );
      dto = { ...dto, avatar: avatarPath };
    }
    return await userRepository.updateOne(_userId, dto, returnType);
  }

  public async deleteKeys(
    userId: string,
    dto: IUserDeleteKeys,
    returnType: ReturnDocumentTypeEnum,
    avatar?: string,
  ): Promise<IUserUpdated | null> {
    const dtoToUpdate: FilterQuery<IUserDeleteKeys> = {
      $unset: Object.fromEntries(Object.keys(dto).map((e) => [e, "1"])),
    };
    if (Object.keys(dto).includes("avatar") && avatar) {
      await s3Service.deleteFile(avatar);
    }
    return await userRepository.updateOne(userId, dtoToUpdate, returnType);
  }

  public async deleteOne(_userId: string): Promise<IUser | null> {
    await authTokenRepository.deleteAll(_userId);
    await authTokenRepository.deleteAll(_userId);
    return await userRepository.deleteOne(_userId);
  }
}

export const userServices = new UserServices();
