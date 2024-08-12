import { FilterQuery, isObjectIdOrHexString, SortOrder } from "mongoose";

import { CarOrderByEnum } from "../enums/carOrderBy.enum";
import { noFoundCheck } from "../errors/noIdFound";
import { ICarCreate, ICarUpdate, ICarUpdated } from "../interfaces/ICar";
import { IPaginated } from "../interfaces/IPaginated";
import { CarModel } from "../models/car.model";

class CarRepository {
  public async findAll({
    limit,
    page,
    order,
    orderBy,
    search,
  }: IPaginated<CarOrderByEnum>): Promise<[ICarUpdated[], number]> {
    const filterObject: FilterQuery<ICarUpdated> = {};
    if (search) {
      filterObject.$or = [
        {
          brand: {
            $regex: search,
            $options: "i",
          },
        },
        {
          yearBuild: search ? (Number(search) ? +search : 0) : 0,
        },
        {
          price: search ? (Number(search) ? +search : 0) : 0,
        },
        {
          _ownerId: isObjectIdOrHexString(search) ? search : null,
        },
      ];
    }
    const sortObject: { [key: string]: SortOrder } = {};
    sortObject[orderBy] = order;
    const cars: ICarUpdated[] = await CarModel.find(filterObject)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortObject);
    const total = await CarModel.countDocuments(filterObject);
    return [cars, total];
  }

  public async createOne(dto: ICarCreate): Promise<ICarUpdated> {
    return await CarModel.create(dto);
  }

  public async findOne(id: string): Promise<ICarUpdated | null> {
    const result = await CarModel.findById(id);

    noFoundCheck(id, result);
    return result;
  }

  public async updateOne(
    id: string,
    dto: ICarUpdate,
  ): Promise<ICarUpdated | null> {
    const result = await CarModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noFoundCheck(id, result);
    return result;
  }

  public async replaceOne(
    id: string,
    dto: ICarUpdate,
  ): Promise<ICarUpdated | null> {
    const result = await CarModel.findOneAndReplace(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noFoundCheck(id, result);
    return result;
  }

  public async deleteOne(id: string): Promise<ICarUpdated | null> {
    const result = await CarModel.findOneAndDelete({ _id: id });
    noFoundCheck(id, result);
    return result;
  }
}
export const carRepository = new CarRepository();
