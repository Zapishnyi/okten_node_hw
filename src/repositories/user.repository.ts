import { FilterQuery, SortOrder } from "mongoose";

import { ReturnDocumentTypeEnum } from "../enums/returnDocumentType.enum";
import { UserOrderByEnum } from "../enums/userOrderBy.enum";
import { noFoundCheck } from "../errors/noIdFound";
import { IPaginated } from "../interfaces/IPaginated";
import { IUserUpdate, IUserUpdated } from "../interfaces/IUser";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async findAll({
    page,
    limit,
    order,
    orderBy,
    search,
  }: IPaginated<UserOrderByEnum>): Promise<[IUserUpdated[], number]> {
    const filterObject: FilterQuery<IUserUpdated> = {
      /* isVerified:true   */
    };
    if (search) {
      filterObject.$or = [
        {
          userName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          age: search ? (Number(search) ? +search : 0) : 0,
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const sortObject: { [key: string]: SortOrder } = {};
    sortObject[orderBy] = order;
    const users: IUserUpdated[] = await UserModel.find(filterObject)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortObject);
    const total = await UserModel.countDocuments(filterObject);
    return [users, total];
  }

  public async createOne(dto: IUserUpdate): Promise<IUserUpdated> {
    // await UserModel.syncIndexes();
    return await UserModel.create(dto);
  }

  public async findOneById(id: string): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findById(id);
    noFoundCheck(id, result);
    return result;
  }
  public async findOneByParam(
    param: FilterQuery<IUserUpdate>,
  ): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findOne(param);
    noFoundCheck(Object.keys(param)[0], result);
    return result;
  }
  public async findManyByParam(
    param: FilterQuery<IUserUpdate>,
  ): Promise<IUserUpdated[] | null> {
    return await UserModel.find(param);
  }

  public async updateOne(
    id: string,
    dto: IUserUpdate,
    returnType: ReturnDocumentTypeEnum,
  ): Promise<IUserUpdated | null> {
    const result: IUserUpdated | null = await UserModel.findByIdAndUpdate(
      id,
      dto,
      { returnDocument: returnType },
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
    const result: IUserUpdated | null = await UserModel.findByIdAndDelete(id);
    noFoundCheck(id, result);
    return result;
  }
}
export const userRepository = new UserRepository();
