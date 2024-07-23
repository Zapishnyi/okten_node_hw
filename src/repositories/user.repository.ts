import { noIdFoundCheck } from "../errors/noIdFound";
import IUser from "../interfaces/IUser";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public async createOne(dto: IUser): Promise<IUser> {
    return await UserModel.create(dto);
  }

  public async findOne(id: string): Promise<IUser | null> {
    const result = await UserModel.findById(id);
    noIdFoundCheck(id, result);
    return result;
  }

  public async updateOne(id: string, dto: IUser): Promise<IUser | null> {
    const result = await UserModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noIdFoundCheck(id, result);
    return result;
  }

  public async replaceOne(id: string, dto: IUser): Promise<IUser | null> {
    const result = await UserModel.findOneAndReplace(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noIdFoundCheck(id, result);
    return result;
  }

  public async deleteOne(id: string): Promise<IUser | null> {
    const result = await UserModel.findOneAndDelete({ _id: id });
    noIdFoundCheck(id, result);
    return result;
  }
}
export const userRepository = new UserRepository();
