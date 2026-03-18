import { Router } from "express";
import * as pokemonController from "../controllers/pokemonController.js";
import * as voteController from "../controllers/voteController.js";
import { validateId } from "../middlewares/common.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

// Route pour lister les pokemons
router.get("/", pokemonController.getAll);

// Route pour afficher le podium
router.get("/podium", pokemonController.getPodium);

// Route pour trouver un pokemon
router.get("/:id",validateId(), pokemonController.getOne);

// Route pour voter
router.post("/:id/vote",validateId(), verifyToken, voteController.addVote);
router.delete("/:id/vote",validateId(), verifyToken, voteController.removeVote);


export { router as pokemonRouter };