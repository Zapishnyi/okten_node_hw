import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { schemaModel } from "../enums/schemaModel.enum";
import { auth } from "../middlewares/auth.check";
import { validation } from "../middlewares/user.car.check";

const router = Router();

// Get All Car

router.get("/", auth.accessTokenCheck(), carController.findAll);

// Get one Car by ID

router.get(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  carController.findOne,
);

//  Add one Car

router.post(
  "/",
  auth.accessTokenCheck(),
  validation.userOrCar(true, schemaModel.Car),
  carController.addOne,
);

// Edit one Car by ID

router.patch(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  validation.userOrCar(false, schemaModel.Car),
  carController.updateOne,
);

// Replace one Car by ID

router.put(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  validation.userOrCar(true, schemaModel.Car),
  carController.replaceOne,
);

// Delete one Car by ID

router.delete(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  carController.deleteOne,
);

export const carRouter = router;
