import { IToken } from "../interfaces/IToken";
import IUser from "../interfaces/IUser";
import IUserSingUp from "../interfaces/IUserSingUp";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { hashService } from "./hash.service";

class AuthServices {
  public async singUp(dto: IUserSingUp): Promise<IUser> {
    return await userRepository.createOne({
      ...dto,
      password: await hashService.hash(dto.password),
    });
  }

  public async login(userId: string): Promise<IToken> {
    return await tokenRepository.create(userId);
  }
  public async refresh(userId: string, token: string): Promise<IToken> {
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
