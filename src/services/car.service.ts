import ICar from "../interfaces/ICar";
import { CarModel } from "../models/car.model";
import { carRepository } from "../repositories/car.repository";

class CarServices {
  public async findAll(): Promise<ICar[]> {
    return await carRepository.findAll();
  }

  public async findOne(carId: string): Promise<ICar | null> {
    return await carRepository.findOne(carId);
  }

  public async createOne(dto: ICar): Promise<ICar> {
    await CarModel.syncIndexes();
    return await carRepository.createOne(dto);
  }

  public async updateOne(carId: string, dto: ICar): Promise<ICar | null> {
    return await carRepository.updateOne(carId, dto);
  }

  public async replaceOne(carId: string, dto: ICar): Promise<ICar | null> {
    return await carRepository.replaceOne(carId, dto);
  }

  public async deleteOne(carId: string): Promise<ICar | null> {
    return await carRepository.deleteOne(carId);
  }
}

export const carServices = new CarServices();
