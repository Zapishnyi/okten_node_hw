import { FilterQuery } from "mongoose";

import { TokenEnum } from "../enums/tokenType.enum";
import {
  ITokenAuth,
  ITokenAuthUpdate,
  ITokenAuthUpdated,
} from "../interfaces/ITokenAuth";
import { AuthTokenModel } from "../models/authToken.model";
import { tokenServices } from "../services/token.service";

class AuthTokenRepository {
  public async create(_userId: string): Promise<ITokenAuth> {
    return await AuthTokenModel.create({
      access: tokenServices.generateToken({ _userId }, TokenEnum.access),
      refresh: tokenServices.generateToken({ _userId }, TokenEnum.refresh),
      _userId,
    });
  }

  public async deleteOne(token: string): Promise<void> {
    await AuthTokenModel.findOneAndDelete({
      $or: [{ access: token }, { refresh: token }],
    });
  }
  public async deleteOneByParams(
    params: FilterQuery<ITokenAuthUpdate>,
  ): Promise<void> {
    await AuthTokenModel.findOneAndDelete(params);
  }
  public async deleteManyByParams(
    params: FilterQuery<ITokenAuthUpdate>,
  ): Promise<void> {
    await AuthTokenModel.deleteMany(params);
  }
  public async findManyByParams(
    params: FilterQuery<ITokenAuthUpdate>,
  ): Promise<ITokenAuthUpdated[] | null> {
    return await AuthTokenModel.find(params);
  }
  public async findOne(token: string): Promise<ITokenAuth | null> {
    return await AuthTokenModel.findOne({
      $or: [{ access: token }, { refresh: token }],
    });
  }

  public async deleteAll(_userId: string): Promise<void> {
    await AuthTokenModel.deleteMany({ _userId });
  }
}
export const authTokenRepository = new AuthTokenRepository();
