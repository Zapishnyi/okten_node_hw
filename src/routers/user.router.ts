import { Router } from "express";

import { routs } from "../constants/routs";
import { userController } from "../controllers/user.controller";
import { schemaModel } from "../enums/schemaModel.enum";
import { validation } from "../middlewares/user.car.check";

const router = Router();

// Get All Users

router.get(routs.root, userController.findAll);

// Get one user by ID

router.get(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  userController.findOne,
);

//  Add one User

router.post(
  routs.root,
  validation.strict(true, schemaModel.User),
  userController.addOne,
);

// Edit one user by ID

router.patch(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  validation.strict(false, schemaModel.User),
  userController.updateOne,
);

// Replace one user by ID

router.put(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  validation.strict(true, schemaModel.User),
  userController.replaceOne,
);

// Delete one user by ID

router.delete(
  routs.root + ":" + routs.id,
  validation.id(routs.id),
  userController.deleteOne,
);

export const userRouter = router;
