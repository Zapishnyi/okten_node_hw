import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { auth } from "../middlewares/auth.check";
import { idCheck } from "../middlewares/id.check";
import { userCheck } from "../middlewares/user.check";
import { validate } from "../middlewares/validate";
import { validUser } from "../validators/user.validator";

const router = Router();

// Get All Users

router.get(
  "/",
  auth.tokenCheck(TokenEnumList.access),
  userCheck.role(),
  userController.findAll,
);

// Get me

router.get("/me", auth.tokenCheck(TokenEnumList.access), userController.findMe);

// Get one user by ID

router.get(
  "/:id",
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  userCheck.role(),
  userController.findOne,
);

// Edit one user by ID

router.patch(
  "/:id",
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  userCheck.role(),
  validate(validUser.userUpdate),
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
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  userCheck.role(),
  userController.deleteOne,
);

export const userRouter = router;
