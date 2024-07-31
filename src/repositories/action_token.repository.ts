import { ActionTypeEnum } from "../enums/action-type.enum";
import { TokenEnum } from "../enums/tokenType.enum";
import { ITokenAction } from "../interfaces/ITokenAction";
import { ActionTokenModel } from "../models/actionTokem.model";
import { tokenServices } from "../services/token.service";

class ActionTokenRepository {
  public async create(
    _userId: string,
    type: ActionTypeEnum,
  ): Promise<ITokenAction> {
    return await ActionTokenModel.create({
      action: tokenServices.generateToken({ _userId }, TokenEnum.action),
      _userId,
      type,
    });
  }

  public async deleteOne(token: string): Promise<void> {
    await ActionTokenModel.findOneAndDelete({ action: token });
  }
  public async findOne(token: string): Promise<ITokenAction | null> {
    return await ActionTokenModel.findOne({ action: token });
  }

  // public async deleteAll(_userId: string): Promise<void> {
  //   await ActionTokenModel.deleteMany({ __userId: _userId });
  // }
}
export const actionTokenRepository = new ActionTokenRepository();
