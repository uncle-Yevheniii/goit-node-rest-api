import { Router } from "express";

import { checkLogInData } from "../middleware/authMiddleware.js";
import { checkRegisterData } from "../middleware/authMiddleware.js";
import { hashingPassword } from "../middleware/authMiddleware.js";
import { logInController } from "../controllers/authControllers.js";
import { registerController } from "../controllers/authControllers.js";

const router = Router();

router
  .route("/register")
  .post(checkRegisterData, hashingPassword, registerController);

router.route("/login").post(checkLogInData, logInController);

export { router };
