import express from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validate from "../../middlewares/validate.middleware";

const router = express.Router();

router.post(
  "/signup",
  validate(authValidation.signupSchema),
  authController.signup,
);
router.post(
  "/signin",
  validate(authValidation.signinSchema),
  authController.signin,
);

export const authRoutes = router;
