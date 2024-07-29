import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenEnum } from "../enums/tokenType.enum";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { ApiError } from "../errors/api.error";
import { ITokenAction } from "../interfaces/ITokenAction";
import { ITokenAuth } from "../interfaces/ITokenAuth";
import { actionTokenRepository } from "../repositories/action_token.repository";
import { authTokenRepository } from "../repositories/auth_token.repository";

class TokenServices {
  public generateAuthTokenPair(payload: { userId: string }): ITokenAuth {
    return {
      access: jwt.sign(payload, config.JWT_ACCESS, {
        expiresIn: config.JWT_ACCESS_EXP,
      }),
      refresh: jwt.sign(payload, config.JWT_REFRESH, {
        expiresIn: config.JWT_REFRESH_EXP,
      }),
      _userId: payload.userId,
    };
  }

  public generateActionToken(payload: { userId: string }): ITokenAction {
    return {
      action: jwt.sign(payload, config.JWT_ACTION, {
        expiresIn: config.JWT_ACTION_EXP,
      }),
      _userId: payload.userId,
    };
  }

  public async checkToken(
    token: string,
    tokenType: TokenEnumList,
  ): Promise<string> {
    switch (tokenType) {
      case "refresh" || "access": {
        if (!(await authTokenRepository.findOne(token))) {
          throw new ApiError("Authentication token is missing.", 401);
        }
        break;
      }
      case "action": {
        if (!(await actionTokenRepository.findOne(token))) {
          throw new ApiError("Action token is missing.", 401);
        }
        break;
      }
    }
    return jwt.verify(token, config[TokenEnum[tokenType]]) as string;
  }
}
export const tokenServices = new TokenServices();
