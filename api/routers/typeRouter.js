import { Router } from "express";
import * as typeController from "../controllers/typeController.js";
import { controllerHandler } from "../middlewares/common.middleware.js";

const router = Router();

router.get("/", controllerHandler(typeController.getAll));
router.get("/:id", controllerHandler(typeController.getOne));

export { router as typeRouter };