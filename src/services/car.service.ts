import { ICarCreate, ICarUpdate, ICarUpdated } from "../interfaces/ICar";
import { CarModel } from "../models/car.model";
import { carRepository } from "../repositories/car.repository";

class CarServices {
  public async findAll(): Promise<ICarUpdated[]> {
    return await carRepository.findAll();
  }

  public async findOne(carId: string): Promise<ICarUpdated | null> {
    return await carRepository.findOne(carId);
  }

  public async createOne(dto: ICarCreate): Promise<ICarUpdated> {
    await CarModel.syncIndexes();
    return await carRepository.createOne(dto);
  }

  public async updateOne(
    carId: string,
    dto: ICarUpdate,
  ): Promise<ICarUpdated | null> {
    return await carRepository.updateOne(carId, dto);
  }

  public async replaceOne(
    carId: string,
    dto: ICarUpdate,
  ): Promise<ICarUpdated | null> {
    return await carRepository.replaceOne(carId, dto);
  }

  public async deleteOne(carId: string): Promise<ICarUpdated | null> {
    return await carRepository.deleteOne(carId);
  }
}

export const carServices = new CarServices();
