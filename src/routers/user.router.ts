import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { schemaModel } from "../enums/schemaModel.enum";
import { auth } from "../middlewares/auth.check";
import { validation } from "../middlewares/user.car.check";

const router = Router();

// Get All Users

// router.get("/", userController.findAll);

// Get one user by ID

router.get(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  validation.userRoleCheck(),
  userController.findOne,
);

// Edit one user by ID

router.patch(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  validation.userRoleCheck(),
  validation.userOrCar(false, schemaModel.User),
  userController.updateOne,
);

// Replace one user by ID

// router.put(
//   "/:id",
//   validation.id(),
//   validation.userOrCar(true, schemaModel.User),
//   userController.replaceOne,
// );

// Delete one user by ID

router.delete(
  "/:id",
  auth.accessTokenCheck(),
  validation.id(),
  validation.userRoleCheck(),
  userController.deleteOne,
);

export const userRouter = router;
