import { Router } from "express";

import { checkLogInData } from "../middleware/authMiddleware.js";
import { uploadAvatar } from "../middleware/imageMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkRegisterData } from "../middleware/authMiddleware.js";
import { logInController } from "../controllers/authControllers.js";
import { currentUserController } from "../controllers/authControllers.js";
import { uppdateUserAvatarController } from "../controllers/authControllers.js";
import { logOutController } from "../controllers/authControllers.js";
import { registerController } from "../controllers/authControllers.js";

const router = Router();

router.route("/register").post(checkRegisterData, registerController);
router.route("/login").post(checkLogInData, logInController);
router.route("/logout").post(protect, logOutController);
router.route("/current").get(protect, currentUserController);
router
  .route("/avatars")
  .patch(protect, uploadAvatar, uppdateUserAvatarController);
router
  .route("/avatars")
  .put(protect, uploadAvatar, uppdateUserAvatarController);

export { router };
