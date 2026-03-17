import { Router } from "express";
import * as pokemonController from "../controllers/pokemonController.js";
import * as voteController from "../controllers/voteController.js";
import { validateId } from "../middlewares/common.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

// Route pour trouver pokemon
router.get("/", pokemonController.getAll);
router.get("/:id",validateId(), pokemonController.getOne);

// Route pour voter
router.post("/:id/vote",validateId(), verifyToken, voteController.addVote);
router.delete("/:id/vote",validateId(), verifyToken, voteController.removeVote);


export { router as pokemonRouter };