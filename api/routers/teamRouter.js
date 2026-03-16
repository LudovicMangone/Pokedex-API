import { Router } from "express";
import * as teamController from "../controllers/teamController.js";
import { controllerHandler } from "../middlewares/common.middleware.js";

const router = Router();

// --- Routes pour l'entité Team ---

// Consulter toutes les équipes
router.get("/", controllerHandler(teamController.getAll));

// Consulter une équipe précise (avec ses caractéristiques et ses Pokémons)
router.get("/:id", controllerHandler(teamController.getOne));

// Créer une nouvelle équipe
router.post("/", controllerHandler(teamController.create));

// Modifier le nom ou la description d'une équipe
router.patch("/:id", controllerHandler(teamController.update));

// Supprimer une équipe
router.delete("/:id", controllerHandler(teamController.destroy));


// --- Routes pour les relations (Roadmap V1) ---

// Ajouter un Pokémon à une équipe
// URL suggérée : POST /teams/1/pokemons/25 (ajoute Pikachu à l'équipe 1)
router.post("/:teamId/pokemons/:pokemonId", controllerHandler(teamController.addPokemonToTeam));

// Optionnel : Retirer un Pokémon d'une équipe
router.delete("/:teamId/pokemons/:pokemonId", controllerHandler(teamController.removePokemonFromTeam));

export { router as teamRouter};