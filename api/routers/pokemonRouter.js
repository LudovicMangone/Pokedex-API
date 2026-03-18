import { Router } from "express";
import * as pokemonController from "../controllers/pokemonController.js";
import * as voteController from "../controllers/voteController.js";
import { validateId } from "../middlewares/common.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

/**
 *  @swagger
 * /pokemons:
 *   get:
 *     tags:
 *      - Pokémons
 *     summary: Récupère tous les pokémons
 *     description: Retourne la liste complète des pokémons avec filtres optionnels par nom ou type.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrer par nom de Pokémon
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrer par nom de type (ex. Feu, Eau)
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès. 
 */
router.get("/", pokemonController.getAll);

// Route pour afficher le podium
router.get("/podium", pokemonController.getPodium);

// Route pour comparer deux pokemons
router.get("/compare/:id1/:id2",validateId("id1"),validateId("id2"), pokemonController.compare);

// Route pour trouver un pokemon
/**
* @swagger
* /pokemons/{id}:
*  get:
*    tags:
*      - Pokémons
*    summary: Récupère un pokémon par son ID
*    parameters:
*      - in: path
*        name: id
*        required: true
*        schema:
*          type: integer
*        description: L'ID unique du pokémon
*    responses:
*      200:
*        description: Détails du pokémon trouvés.
*      404:
*        description: Pokémon non trouvé.
 */
router.get("/:id",validateId(), pokemonController.getOne);

// Route pour voter
router.post("/:id/vote",validateId(), verifyToken, voteController.addVote);
router.delete("/:id/vote",validateId(), verifyToken, voteController.removeVote);


export { router as pokemonRouter };