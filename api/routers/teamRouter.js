import { Router } from "express";
import * as teamController from "../controllers/teamController.js";
import { controllerHandler } from "../middlewares/common.middleware.js";
import { createTeamSchema, updateTeamSchema } from "../schemas/team.schema.js";
import { validateSchema } from "../middlewares/common.middleware.js";

const router = Router();

// --- Routes pour l'entité Team ---
router.get("/", controllerHandler(teamController.getAll));
router.get("/:id", controllerHandler(teamController.getOne));
router.post("/", validateSchema(createTeamSchema), controllerHandler(teamController.create));
router.patch("/:id", validateSchema(updateTeamSchema), controllerHandler(teamController.update));
router.delete("/:id", controllerHandler(teamController.destroy));


// --- Routes pour les relations  ---

router.post("/:teamId/pokemons/:pokemonId", controllerHandler(teamController.addPokemonToTeam));
router.delete("/:teamId/pokemons/:pokemonId", controllerHandler(teamController.removePokemonFromTeam));

export { router as teamRouter};