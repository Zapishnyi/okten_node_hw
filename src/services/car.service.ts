import ICar from "../interfaces/ICar";
import { carRepository } from "../repositories/car.repository";

class CarServices {
  public async findAll(): Promise<ICar[]> {
    return await carRepository.findAll();
  }

  public async findOne(userId: string): Promise<ICar | null> {
    return await carRepository.findOne(userId);
  }

  public async createOne(newUser: ICar): Promise<ICar> {
    return await carRepository.createOne(newUser);
  }

  public async updateOne(userId: string, dto: ICar): Promise<ICar | null> {
    return await carRepository.updateOne(userId, dto);
  }

  public async replaceOne(userId: string, dto: ICar): Promise<ICar | null> {
    return await carRepository.replaceOne(userId, dto);
  }

  public async deleteOne(userId: string): Promise<ICar | null> {
    return await carRepository.deleteOne(userId);
  }
}

export const carServices = new CarServices();
