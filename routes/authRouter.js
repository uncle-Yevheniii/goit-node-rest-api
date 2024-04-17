import { Router } from "express";

import { checkRegisterData } from "../middleware/authMiddleware.js";
import { hashingPassword } from "../middleware/authMiddleware.js";
import { registerController } from "../controllers/authControllers.js";

const router = Router();

router
  .route("/register")
  .post(checkRegisterData, hashingPassword, registerController);

router.post("/login");

export { router };
