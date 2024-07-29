import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { auth } from "../middlewares/auth.check";
import { userCheck } from "../middlewares/user.check";

const router = Router();

// Register

router.post("/sing-up", userCheck.validation(true), authController.singUp);

// Login

router.get(
  "/login",
  auth.credentialsValidation(),
  auth.passwordCheck(),
  authController.login,
);

router.post(
  "/verify",
  auth.tokenCheck(TokenEnumList.action),
  authController.verify,
);

// Refresh

router.get(
  "/refresh",
  auth.tokenCheck(TokenEnumList.refresh),
  authController.refresh,
);

// Log Out Current device

router.get(
  "/log-out/me",
  auth.tokenCheck(TokenEnumList.access),
  authController.log_outCurrent,
);

// Log Out All device

router.get(
  "/log-out/all",
  auth.tokenCheck(TokenEnumList.access),
  authController.log_outAll,
);

export const authRouter = router;
