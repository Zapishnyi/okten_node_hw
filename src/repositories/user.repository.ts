import { noIdFoundCheck } from "../errors/noIdFound";
import IUser from "../interfaces/IUser";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public async createOne(dto: IUser): Promise<IUser> {
    await UserModel.syncIndexes();
    return await UserModel.create(dto);
  }

  public async findOne(id: string): Promise<IUser | null> {
    const result: IUser | null = await UserModel.findById(id);
    noIdFoundCheck(id, result);
    return result;
  }
  public async findByUserName(userName: string): Promise<IUser | null> {
    const result: IUser | null = await UserModel.findOne({ userName });
    noIdFoundCheck(userName, result);
    return result;
  }

  public async updateOne(id: string, dto: IUser): Promise<IUser | null> {
    const { userName, password, email, ...newDto } = dto;
    console.log(userName, password, email);
    const result: IUser | null = await UserModel.findOneAndUpdate(
      { _id: id },
      { ...newDto },
      { returnDocument: "after" },
    );
    noIdFoundCheck(id, result);
    return result;
  }

  public async replaceOne(id: string, dto: IUser): Promise<IUser | null> {
    const result: IUser | null = await UserModel.findOneAndReplace(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noIdFoundCheck(id, result);
    return result;
  }

  public async deleteOne(id: string): Promise<IUser | null> {
    const result: IUser | null = await UserModel.findOneAndDelete({
      _id: id,
    });
    noIdFoundCheck(id, result);
    return result;
  }
}
export const userRepository = new UserRepository();
