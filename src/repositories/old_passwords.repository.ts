import { FilterQuery } from "mongoose";

import { IOldPassword, IOldPasswordUpdated } from "../interfaces/IOldPassword";
import { oldPasswordModel } from "../models/oldPasswords.model";

class OldPasswordsRepository {
  public async create(
    password: string,
    _userId: string,
  ): Promise<IOldPasswordUpdated> {
    return await oldPasswordModel.create({
      password,
      _userId,
    });
  }
  public async findOneByParams(
    params: FilterQuery<IOldPassword>,
  ): Promise<IOldPasswordUpdated | null> {
    return await oldPasswordModel.findOne(params);
  }

  public async deleteOneByParams(
    params: FilterQuery<IOldPassword>,
  ): Promise<void> {
    await oldPasswordModel.findOneAndDelete(params);
  }
  public async deleteManyByParams(
    params: FilterQuery<IOldPassword>,
  ): Promise<void> {
    await oldPasswordModel.deleteMany(params);
  }

  // public async deleteAll(_userId: string): Promise<void> {
  //   await oldPasswordModel.deleteMany({ __userId: _userId });
  // }
}
export const oldPasswordsRepository = new OldPasswordsRepository();
