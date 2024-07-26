import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { schemaModel } from "../enums/schemaModel.enum";
import { auth } from "../middlewares/auth.check";
import { validation } from "../middlewares/user.car.check";

const router = Router();

// Register

router.post(
  "/sing-up",
  validation.userOrCar(true, schemaModel.User),
  authController.singUp,
);

// Login

router.get(
  "/login",
  auth.credentialsValidation(),
  auth.passwordCheck(),
  authController.login,
);

// Refresh

router.get("/refresh", auth.refreshTokenCheck(), authController.refresh);

// Log Out Current device

router.get(
  "/log-out/me",
  auth.accessTokenCheck(),
  authController.log_outCurrent,
);

// Log Out All device

router.get("/log-out/all", auth.accessTokenCheck(), authController.log_outAll);

export const authRouter = router;
