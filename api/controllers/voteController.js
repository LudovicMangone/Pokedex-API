import { Pokemon, User, Vote } from "../models/index.js";

// POST /pokemons/:id/vote
export async function addVote(req, res) {
    const pokemonId = req.params.id;
    const userId = req.user.userId;

    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }

    const hasVoted = await pokemon.hasVoter(userId);
    if (hasVoted) {
        return res.status(400).json({ message: "Vous avez déjà voté pour ce Pokémon" });
    }

    // 3. On ajoute le vote
    await pokemon.addVoter(userId);

    res.status(201).json({ message: `Vote enregistré pour ${pokemon.name}` });
}

// DELETE /pokemons/:id/vote
export async function removeVote(req, res) {
    const pokemonId = req.params.id;
    const userId = req.user.userId;

    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }

    const hasVoted = await pokemon.hasVoter(userId);
    if (!hasVoted) {
        return res.status(400).json({ message: "Vous n'avez pas encore voté pour ce Pokémon" });
    }

    await pokemon.removeVoter(userId);

    res.status(200).json({ message: `Vote retiré pour ${pokemon.name}` });
}