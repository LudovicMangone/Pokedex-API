import { Router } from "express";
import * as teamController from "../controllers/teamController.js";
import  { validateSchema, validateId } from "../middlewares/common.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isTeamOwner } from "../middlewares/team.guard.js";
import { createTeamSchema, updateTeamSchema } from "../schemas/team.schema.js";

const router = Router();

// --- Routes pour l'entité Team publiques ---
router.get("/",teamController.getAll);
router.get("/:id",validateId(),teamController.getOne);

// --- Routes pour l'entité Team protégées ---
router.use(verifyToken);

router.post("/", validateSchema(createTeamSchema),teamController.create);

router.patch("/:id",validateId(), isTeamOwner, validateSchema(updateTeamSchema),teamController.update);
router.delete("/:id",validateId(),isTeamOwner, teamController.destroy);


// --- Routes pour les relations  ---

router.post("/:teamId/pokemons/:pokemonId",validateId("teamId"),validateId("pokemonId"),isTeamOwner, teamController.addPokemonToTeam);
router.delete("/:teamId/pokemons/:pokemonId",validateId("teamId"),validateId("pokemonId"),isTeamOwner, teamController.removePokemonFromTeam);

export { router as teamRouter};