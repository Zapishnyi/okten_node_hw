import { NextFunction, Request, Response } from "express";

import { carServices } from "../services/car.service";

class CarController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await carServices.findAll());
    } catch (err) {
      next(err);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await carServices.findOne(req.params.id));
    } catch (err) {
      next(err);
    }
  }

  public async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(
        await carServices.createOne({
          ...req.body,
          ownerId: res.locals._userId,
        }),
      );
    } catch (err) {
      next(err);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await carServices.updateOne(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  }
  //
  public async replaceOne(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await carServices.replaceOne(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  }
  //
  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await carServices.deleteOne(req.params.id);
      res.status(200).json(`User with ID ${req.params.id} successful deleted`);
    } catch (err) {
      next(err);
    }
  }
}

export const carController = new CarController();
