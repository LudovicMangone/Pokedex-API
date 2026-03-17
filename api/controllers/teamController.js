import { Team, Pokemon } from "../models/index.js";

// GET /teams
export async function getAll(req, res) {
    const teams = await Team.findAll({
        include: {
            association: "pokemons",
            attributes: ["id","name"],
            through: {
                attributes: []
        }
    }
    });
    res.json(teams);
}

// GET /teams/:id
export async function getOne(req, res) {
    const team = await Team.findByPk(req.params.id, { include: "pokemons" });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
}

// POST /teams
export async function create(req, res) {
    const team = await Team.create(req.body);
    res.status(201).json(team);
}

// PATCH /teams/:id
export async function update(req, res) {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    
    await team.update(req.body);
    res.json(team);
}

// DELETE /teams/:id
export async function destroy(req, res) {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    
    await team.destroy();
    res.status(204).end();
}

// POST /teams/:id/pokemons/:pokemonId
export async function addPokemonToTeam(req, res) {
    const { teamId, pokemonId } = req.params;
    const team = await Team.findByPk(teamId, { include: "pokemons" });
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!team || !pokemon) return res.status(404).json({ message: "Team or Pokemon not found" });
    const exist = await team.hasPokemon(pokemon);
    if (team.pokemons.length >= 6) {
        return res.status(400).json({ message: "L'équipe est déjà pleine" })
    }
    if (exist) {
        return res.status(400).json({ message: `Le pokemon ${pokemon.name} est déjà dans l'équipe ${team.name}` })
    }

    await team.addPokemon(pokemon);
    res.status(201).json({ message: `Ajout du pokemon ${pokemon.name} à l'équipe ${team.name}` });
}

// DELETE /teams/:id/pokemons/:pokemonId
export async function removePokemonFromTeam(req, res) {
    const { teamId, pokemonId } = req.params;
    const team = await Team.findByPk(teamId);
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!team || !pokemon) return res.status(404).json({ message: "Team or Pokemon not found" });
        const exist = await team.hasPokemon(pokemon);
    if (!exist) {
    return res.status(400).json({ message: "Ce Pokémon n'est pas dans cette équipe" });    }
    await team.removePokemon(pokemon);
    res.status(200).json({ message: `Suppression du pokemon ${pokemon.name} de l'équipe ${team.name}` });
}