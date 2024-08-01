import { config } from "../configs/config";
import { ActionTypeEnum } from "../enums/action-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ReturnDocumentTypeEnum } from "../enums/returnDocumentType.enum";
import { ITokenAuth } from "../interfaces/ITokenAuth";
import {
  IUser,
  IUserPasswordReNew,
  IUserSingUp,
  IUserUpdated,
  IUserVerify,
} from "../interfaces/IUser";
import { actionTokenRepository } from "../repositories/action_token.repository";
import { authTokenRepository } from "../repositories/auth_token.repository";
import { oldPasswordsRepository } from "../repositories/old_passwords.repository";
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
      actionToken: (
        await actionTokenRepository.create(
          userCreated._id,
          ActionTypeEnum.email_verify,
        )
      ).action,
      frontUrl: config.FRONT_END_URL,
    });
    return userCreated;
  }

  public async forgotPassword(user: IUserUpdated): Promise<void> {
    await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, user.email, {
      name: user.userName,
      actionToken: (
        await actionTokenRepository.create(
          user._id,
          ActionTypeEnum.password_renew,
        )
      ).action,
      frontUrl: config.FRONT_END_URL,
    });
  }
  public async renewPassword(
    _userId: string,
    dto: IUserPasswordReNew,
    token: string,
  ): Promise<IUserUpdated | null> {
    const newPassword = await hashService.hash(dto.password);
    const userOld = await userServices.updateOne(
      _userId,
      {
        password: newPassword,
      },
      ReturnDocumentTypeEnum.Before,
    );
    if (userOld) {
      await emailService.sendEmail(
        EmailTypeEnum.PASSWORD_CHANGED,
        userOld.email,
        {
          name: userOld.userName,
          frontUrl: config.FRONT_END_URL,
        },
      );
      await oldPasswordsRepository.create(userOld.password, _userId);
      await actionTokenRepository.deleteOne(token);
      await authTokenRepository.deleteAll(_userId);
    }
    return userOld ? { ...userOld, password: newPassword } : null;
  }

  public async login(userId: string): Promise<ITokenAuth> {
    return await authTokenRepository.create(userId);
  }

  public async verify(
    userId: string,
    dto: IUserVerify,
    actionToken: string,
  ): Promise<IUser | null> {
    const userUpdated = await userServices.updateOne(
      userId,
      dto,
      ReturnDocumentTypeEnum.After,
    );
    await actionTokenRepository.deleteOne(actionToken);
    return userUpdated;
  }

  public async refresh(userId: string, token: string): Promise<ITokenAuth> {
    await authTokenRepository.deleteOne(token);
    return await authTokenRepository.create(userId);
  }

  public async log_outCurrent(token: string, userId: string): Promise<void> {
    await authTokenRepository.deleteOne(token);
    const user = await userServices.findOneById(userId);
    if (user) {
      await emailService.sendEmail(EmailTypeEnum.LOG_OUT, user.email, {
        name: user.userName,
        frontUrl: config.FRONT_END_URL,
      });
    }
  }

  public async log_outAll(userId: string): Promise<void> {
    await authTokenRepository.deleteAll(userId);
    const user = await userServices.findOneById(userId);
    if (user) {
      await emailService.sendEmail(EmailTypeEnum.LOG_OUT, user.email, {
        name: user.userName,
        frontUrl: config.FRONT_END_URL,
      });
    }
  }
}

export const authServices = new AuthServices();
