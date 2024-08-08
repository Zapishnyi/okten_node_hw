import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { FileTypeEnum } from "../enums/file-type.enum";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { auth } from "../middlewares/auth.check";
import { fileCheck } from "../middlewares/file.check";
import { idCheck } from "../middlewares/id.check";
import { userCheck } from "../middlewares/user.check";
import { validateBody, validateQuery } from "../middlewares/validate";
import { validUser } from "../validators/user.validator";
import { validUserDelete } from "../validators/userDelete.validator";

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

// router.patch(
//   "/me/avatar",
//   auth.tokenCheck(TokenEnumList.access),
//   validate(validUser.userUpdate),
//   userController.uploadAvatar,
// );

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
  validateBody(validUser.userUpdate),
  fileCheck(FileTypeEnum.avatar),
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

router.delete(
  "/keys/:id",
  auth.tokenCheck(TokenEnumList.access),
  idCheck(),
  userCheck.role(),
  validateQuery(validUserDelete.keysDelete),
  userController.deleteKeysByParams,
);

export const userRouter = router;
