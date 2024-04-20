import { Router } from "express";

import { checkLogInData } from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkRegisterData } from "../middleware/authMiddleware.js";
import { logInController } from "../controllers/authControllers.js";
import { logOutController } from "../controllers/authControllers.js";
import { registerController } from "../controllers/authControllers.js";
import { currentUserController } from "../controllers/authControllers.js";

const router = Router();

router.post("/register", checkRegisterData, registerController);
router.post("/login", checkLogInData, logInController);
router.get("/current", protect, currentUserController);
router.post("/logout", protect, logOutController);

export { router };
