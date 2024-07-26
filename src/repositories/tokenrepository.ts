import { Schema } from "mongoose";

import { IToken } from "../interfaces/IToken";
import { TokenModel } from "../models/token.model";
import { tokenServices } from "../services/token.service";

class TokenRepository {
  public async create(userId: Schema.Types.ObjectId): Promise<IToken> {
    return await TokenModel.create(
      tokenServices.generatePair({ userId: userId }),
    );
  }

  public async deleteOne(token: string): Promise<void> {
    await TokenModel.findOneAndDelete({ refresh: token });
  }
  public async findOne(token: string): Promise<void> {
    await TokenModel.findOne({ refresh: token });
  }

  public async deleteAll(userId: string): Promise<void> {
    await TokenModel.deleteMany({ _userId: userId });
  }
}
export const tokenRepository = new TokenRepository();
