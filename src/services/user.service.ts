import IUser from "../interfaces/IUser";
import IUserNoID from "../interfaces/IUserNoID";
import { userRepository } from "../repositories/user.repository";

class UserServices {
  public async findAll(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  public async findOne(userId: string): Promise<IUser | null> {
    return await userRepository.findOne(userId);
  }
  public async findOneByUserName(userName: string): Promise<IUser | null> {
    return await userRepository.findByUserName(userName);
  }

  public async createOne(newUser: IUser): Promise<IUser> {
    return await userRepository.createOne(newUser);
  }

  public async updateOne(
    userId: string,
    dto: IUserNoID,
  ): Promise<IUser | null> {
    return await userRepository.updateOne(userId, dto);
  }

  public async replaceOne(userId: string, dto: IUser): Promise<IUser | null> {
    return await userRepository.replaceOne(userId, dto);
  }

  public async deleteOne(userId: string): Promise<IUser | null> {
    return await userRepository.deleteOne(userId);
  }
}

export const userServices = new UserServices();
