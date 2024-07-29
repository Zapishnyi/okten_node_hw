import { ITokenAction } from "../interfaces/ITokenAction";
import { ITokenAuth } from "../interfaces/ITokenAuth";
import { ActionTokenModel } from "../models/actionTokem.model";
import { tokenServices } from "../services/token.service";

class ActionTokenRepository {
  public async create(userId: string): Promise<ITokenAction> {
    return await ActionTokenModel.create(
      tokenServices.generateActionToken({ userId: userId }),
    );
  }

  public async deleteOne(token: string): Promise<void> {
    await ActionTokenModel.findOneAndDelete({ action: token });
  }
  public async findOne(token: string): Promise<ITokenAuth | null> {
    return await ActionTokenModel.findOne({ action: token });
  }

  // public async deleteAll(userId: string): Promise<void> {
  //   await ActionTokenModel.deleteMany({ _userId: userId });
  // }
}
export const actionTokenRepository = new ActionTokenRepository();
