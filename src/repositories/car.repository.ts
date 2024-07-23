import { noIdFoundCheck } from "../errors/noIdFound";
import ICar from "../interfaces/ICar";
import { CarModel } from "../models/car.model";

class CarRepository {
  public async findAll(): Promise<ICar[]> {
    return await CarModel.find();
  }

  public async createOne(dto: ICar): Promise<ICar> {
    return await CarModel.create(dto);
  }

  public async findOne(id: string): Promise<ICar | null> {
    const result = await CarModel.findById(id);
    noIdFoundCheck(id, result);
    return result;
  }

  public async updateOne(id: string, dto: ICar): Promise<ICar | null> {
    const result = await CarModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noIdFoundCheck(id, result);
    return result;
  }

  public async replaceOne(id: string, dto: ICar): Promise<ICar | null> {
    const result = await CarModel.findOneAndReplace(
      { _id: id },
      { ...dto },
      { returnDocument: "after" },
    );
    noIdFoundCheck(id, result);
    return result;
  }

  public async deleteOne(id: string): Promise<ICar | null> {
    const result = await CarModel.findOneAndDelete({ _id: id });
    noIdFoundCheck(id, result);
    return result;
  }
}
export const carRepository = new CarRepository();
