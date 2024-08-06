import { noFoundCheck } from "../errors/noIdFound";
import { ICarCreate, ICarUpdate, ICarUpdated } from "../interfaces/ICar";
import { CarModel } from "../models/car.model";

class CarRepository {
  public async findAll(): Promise<ICarUpdated[]> {
    return await CarModel.find();
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
