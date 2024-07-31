import { noFoundCheck } from "../errors/noIdFound";
import { IUserUpdate, IUserUpdated } from "../interfaces/IUser";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async findAll(): Promise<IUserUpdated[]> {
    return await UserModel.find();
  }

  public async createOne(dto: IUserUpdate): Promise<IUserUpdated> {
    await UserModel.syncIndexes();
    return await UserModel.create(dto);
  }

  public async findOneById(id: string): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findById(id);
    noFoundCheck(id, result);
    return result;
  }
  public async findByParam(param: {
    [key: string]: string;
  }): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findOne(param);
    noFoundCheck(Object.keys(param)[0], result);
    return result;
  }

  public async updateOne(
    id: string,
    dto: IUserUpdate,
  ): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findOneAndUpdate(
      { _id: id },
      dto,
      { returnDocument: "after" },
    );
    noFoundCheck(id, result);
    return result;
  }
  //
  // public async replaceOne(
  //   id: string,
  //   dto: IUserUpdate,
  // ): Promise<IUserUpdated | null> {
  //   const result: IUserUpdated | null = await UserModel.findOneAndReplace(
  //     { _id: id },
  //     { ...dto },
  //     { returnDocument: "after" },
  //   );
  //   noFoundCheck(id, result);
  //   return result;
  // }

  public async deleteOne(id: string): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findOneAndDelete({
      _id: id,
    });
    noFoundCheck(id, result);
    return result;
  }
}
export const userRepository = new UserRepository();
