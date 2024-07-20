import { Router } from "express";

import { routs } from "../constants/routs";
import { userController } from "../controllers/user.controller";
import { validation } from "../middlewares/Validation";

const router = Router();

// Get All Users

router.get(routs.root, userController.findAll);

// Get one user by ID

router.get(
  routs.root + ":" + routs.userId,
  validation.id(routs.userId),
  userController.findOne,
);

//  Add one User

router.post(routs.root, validation.userStrict(true), userController.addOne);

// Edit one user by ID

router.patch(
  routs.root + ":" + routs.userId,
  validation.id(routs.userId),
  validation.userStrict(false),
  userController.updateOne,
);

// Replace one user by ID

router.put(
  routs.root + ":" + routs.userId,
  validation.id(routs.userId),
  validation.userStrict(true),
  userController.replaceOne,
);

// Delete one user by ID

router.delete(
  routs.root + ":" + routs.userId,
  validation.id(routs.userId),
  userController.deleteOne,
);

export const userRouter = router;
