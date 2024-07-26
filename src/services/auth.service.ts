import { Schema } from "mongoose";

import { IToken } from "../interfaces/IToken";
import IUser from "../interfaces/IUser";
import IUserFull from "../interfaces/IUserFull";
import { tokenRepository } from "../repositories/tokenrepository";
import { userRepository } from "../repositories/user.repository";
import { hashService } from "./hash.service";

class AuthServices {
  public async singUp(dto: IUser): Promise<IUserFull> {
    return await userRepository.createOne({
      ...dto,
      password: await hashService.hash(dto.password),
    });
  }

  public async login(userId: Schema.Types.ObjectId): Promise<IToken> {
    return await tokenRepository.create(userId);
  }
  public async refresh(
    userId: Schema.Types.ObjectId,
    token: string,
  ): Promise<IToken> {
    await tokenRepository.deleteOne(token);
    return await tokenRepository.create(userId);
  }
  public async log_outCurrent(token: string): Promise<void> {
    return await tokenRepository.deleteOne(token);
  }
  public async log_outAll(userId: string): Promise<void> {
    return await tokenRepository.deleteAll(userId);
  }
}

export const authServices = new AuthServices();
