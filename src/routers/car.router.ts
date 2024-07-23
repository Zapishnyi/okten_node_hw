import { Router } from "express";

import { routs } from "../constants/routs";
import { carController } from "../controllers/car.controller";
import { schemaModel } from "../enums/schemaModel.enum";
import { validation } from "../middlewares/user.car.check";

const router = Router();

// Get All Car

router.get(routs.root, carController.findAll);

// Get one Car by ID

router.get(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  carController.findOne,
);

//  Add one Car

router.post(
  routs.root,
  validation.strict(true, schemaModel.Car),
  carController.addOne,
);

// Edit one Car by ID

router.patch(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  validation.strict(false, schemaModel.Car),
  carController.updateOne,
);

// Replace one Car by ID

router.put(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  validation.strict(true, schemaModel.Car),
  carController.replaceOne,
);

// Delete one Car by ID

router.delete(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  carController.deleteOne,
);

export const carRouter = router;
