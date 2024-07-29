import { config } from "../configs/config";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ITokenAuth } from "../interfaces/ITokenAuth";
import IUser from "../interfaces/IUser";
import IUserNoID from "../interfaces/IUserNoID";
import IUserSingUp from "../interfaces/IUserSingUp";
import { actionTokenRepository } from "../repositories/action_token.repository";
import { authTokenRepository } from "../repositories/auth_token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { hashService } from "./hash.service";
import { userServices } from "./user.service";

class AuthServices {
  public async singUp(dto: IUserSingUp): Promise<IUser> {
    const userCreated = await userRepository.createOne({
      ...dto,
      password: await hashService.hash(dto.password),
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, dto.email, {
      name: dto.userName,
      actionToken: (await actionTokenRepository.create(userCreated._id)).action,
      frontUrl: config.FRONT_END_URL,
    });
    return userCreated;
  }

  public async login(userId: string): Promise<ITokenAuth> {
    return await authTokenRepository.create(userId);
  }
  public async verify(
    userId: string,
    dto: IUserNoID,
    actionToken: string,
  ): Promise<IUser | null> {
    const userUpdated = await userServices.updateOne(userId, dto);
    await actionTokenRepository.deleteOne(actionToken);
    return userUpdated;
  }

  public async refresh(userId: string, token: string): Promise<ITokenAuth> {
    await authTokenRepository.deleteOne(token);
    return await authTokenRepository.create(userId);
  }

  public async log_outCurrent(token: string, userId: string): Promise<void> {
    await authTokenRepository.deleteOne(token);
    const dto = await userServices.findOne(userId);
    if (dto?.email && dto?.userName) {
      await emailService.sendEmail(EmailTypeEnum.LOG_OUT, dto.email, {
        name: dto.userName,
        frontUrl: config.FRONT_END_URL,
      });
    }
  }
  public async log_outAll(userId: string): Promise<void> {
    await authTokenRepository.deleteAll(userId);
    const dto = await userServices.findOne(userId);
    if (dto?.email && dto?.userName) {
      await emailService.sendEmail(EmailTypeEnum.LOG_OUT, dto.email, {
        name: dto.userName,
        frontUrl: config.FRONT_END_URL,
      });
    }
  }
}

export const authServices = new AuthServices();
