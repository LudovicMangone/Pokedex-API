import { Router } from "express";
import * as typeController from "../controllers/typeController.js";
import { controllerHandler, validateId } from "../middlewares/common.middleware.js";

const router = Router();

router.get("/", controllerHandler(typeController.getAll));
router.get("/:id",validateId(), controllerHandler(typeController.getOne));

export { router as typeRouter };