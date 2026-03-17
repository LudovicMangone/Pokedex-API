import { Router } from "express";
import * as pokemonController from "../controllers/pokemonController.js";
import { validateId } from "../middlewares/common.middleware.js";

const router = Router();

router.get("/", pokemonController.getAll);
router.get("/:id",validateId(), pokemonController.getOne);

export { router as pokemonRouter };