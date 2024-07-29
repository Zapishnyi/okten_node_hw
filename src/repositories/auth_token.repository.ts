import { ITokenAuth } from "../interfaces/ITokenAuth";
import { AuthTokenModel } from "../models/authToken.model";
import { tokenServices } from "../services/token.service";

class AuthTokenRepository {
  public async create(userId: string): Promise<ITokenAuth> {
    return await AuthTokenModel.create(
      tokenServices.generateAuthTokenPair({ userId: userId }),
    );
  }

  public async deleteOne(token: string): Promise<void> {
    await AuthTokenModel.findOneAndDelete({
      $or: [{ access: token }, { refresh: token }],
    });
  }
  public async findOne(token: string): Promise<ITokenAuth | null> {
    return await AuthTokenModel.findOne({
      $or: [{ access: token }, { refresh: token }],
    });
  }

  public async deleteAll(userId: string): Promise<void> {
    await AuthTokenModel.deleteMany({ _userId: userId });
  }
}
export const authTokenRepository = new AuthTokenRepository();
