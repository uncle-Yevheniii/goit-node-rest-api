import { Router } from "express";

import { homeController } from "../controllers/viewControllers.js";

const router = Router();

router.get("/home", homeController);

export { router };
