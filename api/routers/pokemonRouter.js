import { Router } from "express";
import * as pokemonController from "../controllers/pokemonController.js";
import * as voteController from "../controllers/voteController.js";
import { validateId } from "../middlewares/common.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/", pokemonController.getAll);

// Route pour afficher le podium
router.get("/podium", pokemonController.getPodium);

// Route pour comparer deux pokemons
router.get("/compare/:id1/:id2",validateId("id1"),validateId("id2"), pokemonController.compare);

// Route pour trouver un pokemon

router.get("/:id",validateId(), pokemonController.getOne);

// Route pour voter
router.post("/:id/vote",validateId(), verifyToken, voteController.addVote);
router.delete("/:id/vote",validateId(), verifyToken, voteController.removeVote);


export { router as pokemonRouter };