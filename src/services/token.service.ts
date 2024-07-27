import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenEnum } from "../enums/tokenType.enum";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { ApiError } from "../errors/api.error";
import { IToken } from "../interfaces/IToken";
import { tokenRepository } from "../repositories/token.repository";

class TokenServices {
  public generatePair(payload: { userId: string }): IToken {
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

  public async checkToken(
    token: string,
    tokenType: TokenEnumList,
  ): Promise<string> {
    if (!(await tokenRepository.findOne(token))) {
      throw new ApiError("Authentication token is missing.", 401);
    }
    return jwt.verify(token, config[TokenEnum[tokenType]]) as string;
  }
}
export const tokenServices = new TokenServices();
