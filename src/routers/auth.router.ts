import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { TokenEnumList } from "../enums/tokenTypeList.enum";
import { auth } from "../middlewares/auth.check";
import { validateBody } from "../middlewares/validate";
import { validUser } from "../validators/user.validator";

const router = Router();

// Register

router.post("/sing-up", validateBody(validUser.singUp), authController.singUp);

// Login

router.get(
  "/login",
  validateBody(validUser.login),
  auth.passwordCheckBeforeLogin(),
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
  "/password/forgot",
  validateBody(validUser.emailCheck),
  auth.emailCheck(),
  authController.forgotPassword,
);

// Forgot Password renew Password

router.patch(
  "/password/forgot",
  auth.tokenCheck(TokenEnumList.action),
  validateBody(validUser.passwordCheck),
  auth.newPasswordCheck(),
  authController.renewPassword,
);

// Password change

router.patch(
  "/password/change",
  auth.tokenCheck(TokenEnumList.access),
  validateBody(validUser.changePasswordCheck),
  auth.oldPasswordCheck(),
  auth.newPasswordCheck(),
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
