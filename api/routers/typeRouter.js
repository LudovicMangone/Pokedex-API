import { Router } from "express";
import * as typeController from "../controllers/typeController.js";
import { validateId } from "../middlewares/common.middleware.js";

const router = Router();

router.get("/", typeController.getAll);
router.get("/:id",validateId(), typeController.getOne);

export { router as typeRouter };