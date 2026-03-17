import { Router } from "express";
import * as pokemonController from "../controllers/pokemonController.js";
import { controllerHandler } from "../middlewares/common.middleware.js";

const router = Router();

router.get("/", controllerHandler(pokemonController.getAll));
router.get("/:id", controllerHandler(pokemonController.getOne));

export { router as pokemonRouter };