import { CarOrderByEnum } from "../enums/car-order-by.enum";
import { ICarCreate, ICarUpdate, ICarUpdated } from "../interfaces/ICar";
import { IPaginated, IPaginationResult } from "../interfaces/IPaginated";
import { CarModel } from "../models/car.model";
import { toPresentPaginated } from "../presenters/presenter";
import { carRepository } from "../repositories/car.repository";

class CarServices {
  public async findAll(
    query: IPaginated<CarOrderByEnum>,
  ): Promise<IPaginationResult<ICarUpdated, CarOrderByEnum>> {
    const [cars, total] = await carRepository.findAll(query);
    return toPresentPaginated<ICarUpdated, CarOrderByEnum>({
      ...query,
      data: cars,
      total,
    });
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
