import * as jwt from "jsonwebtoken";
import { Schema } from "mongoose";

import { config } from "../configs/config";
import { IToken } from "../interfaces/IToken";

class TokenServices {
  public generatePair(payload: { userId: Schema.Types.ObjectId }): IToken {
    console.log("Generate pair poyload - ", payload);
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

  public checkAccessToken(token: string): string {
    return jwt.verify(token, config.JWT_ACCESS) as string;
  }

  public checkRefreshToken(token: string): string {
    return jwt.verify(token, config.JWT_REFRESH) as string;
  }
}
export const tokenServices = new TokenServices();
