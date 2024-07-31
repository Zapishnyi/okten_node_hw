import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenEnum } from "../enums/tokenType.enum";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { ApiError } from "../errors/api.error";
import { actionTokenRepository } from "../repositories/action_token.repository";
import { authTokenRepository } from "../repositories/auth_token.repository";

class TokenServices {
  public generateToken(payload: { _userId: string }, type: TokenEnum): string {
    return jwt.sign(payload, config[type], {
      expiresIn: config[`${type}_EXP`],
    });
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
