import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { auth } from "../middlewares/auth.check";
import { validate } from "../middlewares/validate";
import { validUser } from "../validators/user.validator";

const router = Router();

// Register

router.post("/sing-up", validate(validUser.singUp), authController.singUp);

// Login

router.get(
  "/login",
  validate(validUser.login),
  auth.passwordCheck(),
  authController.login,
);

// Verify Email

router.post(
  "/verify",
  auth.tokenCheck(TokenEnumList.action),
  authController.verify,
);

// Forgot Password get token

router.post(
  "/forgot-password",
  validate(validUser.emailCheck),
  auth.emailCheck(),
  authController.forgotPassword,
);

// Forgot Password renew Password

router.patch(
  "/forgot-password",
  auth.tokenCheck(TokenEnumList.action),
  validate(validUser.passwordCheck),
  authController.renewPassword,
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
