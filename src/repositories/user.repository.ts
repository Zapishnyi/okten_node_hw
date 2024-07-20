import IUser from "../interfaces/IUser";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public async createOne(dto: IUser): Promise<IUser> {
    return await UserModel.create(dto);
  }

  public async findOne(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  public async updateOne(userId: string, dto: IUser): Promise<IUser | null> {
    return await UserModel.findOneAndUpdate(
      { _id: userId },
      { ...dto },
      { returnDocument: "after" },
    );
  }

  public async replaceOne(userId: string, dto: IUser): Promise<IUser | null> {
    return await UserModel.findOneAndReplace(
      { _id: userId },
      { ...dto },
      { returnDocument: "after" },
    );
  }

  public async deleteOne(userId: string): Promise<null> {
    return await UserModel.findOneAndDelete({ _id: userId });
  }
}
export const userRepository = new UserRepository();
