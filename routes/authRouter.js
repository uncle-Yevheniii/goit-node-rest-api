import { Router } from "express";

import { checkLogInData } from "../middleware/authMiddleware.js";
import { checkRegisterData } from "../middleware/authMiddleware.js";
import { logInController } from "../controllers/authControllers.js";
import { registerController } from "../controllers/authControllers.js";

const router = Router();

router.post("/register", checkRegisterData, registerController);
router.post("/login", checkLogInData, logInController);

export { router };
