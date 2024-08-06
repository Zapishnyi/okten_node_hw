import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { auth } from "../middlewares/auth.check";
import { carCheck } from "../middlewares/car.check";
import { idCheck } from "../middlewares/id.check";
import { validate } from "../middlewares/validate";
import { validCar } from "../validators/car.validator";

const router = Router();

// Get All Car

router.get("/", carController.findAll);

//  Add one Car

router.post(
  "/",
  auth.tokenCheck(TokenEnumList.access),
  validate(validCar.create),
  carController.addOne,
);

// Get one Car by ID

router.get(
  "/:id",
  auth.tokenCheck(TokenEnumList.access),
  carController.findOne,
);

// Edit one Car by ID

router.patch(
  "/:id",
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  validate(validCar.update),
  carCheck.role(),
  carController.updateOne,
);

// Replace one Car by ID

router.put(
  "/:id",
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  validate(validCar.update),
  carCheck.role(),
  carController.replaceOne,
);

// Delete one Car by ID

router.delete(
  "/:id",
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  carCheck.role(),
  carController.deleteOne,
);

export const carRouter = router;
