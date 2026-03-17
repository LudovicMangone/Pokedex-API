import { Router } from "express";
import * as teamController from "../controllers/teamController.js";
import { controllerHandler, validateSchema, validateId } from "../middlewares/common.middleware.js";
import { createTeamSchema, updateTeamSchema } from "../schemas/team.schema.js";

const router = Router();

// --- Routes pour l'entité Team ---
router.get("/", controllerHandler(teamController.getAll));
router.get("/:id",validateId(), controllerHandler(teamController.getOne));
router.post("/", validateSchema(createTeamSchema), controllerHandler(teamController.create));
router.patch("/:id",validateId(), validateSchema(updateTeamSchema), controllerHandler(teamController.update));
router.delete("/:id",validateId(), controllerHandler(teamController.destroy));


// --- Routes pour les relations  ---

router.post("/:teamId/pokemons/:pokemonId",validateId("teamId"),validateId("pokemonId"), controllerHandler(teamController.addPokemonToTeam));
router.delete("/:teamId/pokemons/:pokemonId",validateId("teamId"),validateId("pokemonId"), controllerHandler(teamController.removePokemonFromTeam));

export { router as teamRouter};