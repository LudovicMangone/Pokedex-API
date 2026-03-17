import { Pokemon, Type } from "../models/index.js";

// GET /pokemons
export async function getAll(req, res) {
    const pokemons = await Pokemon.findAll({
        include: {
            association: "types",
            through: { attributes: [] }
        },
        order: [['id', 'ASC']]
    });
    
    res.json(pokemons);
}

// GET /pokemons/:id
export async function getOne(req, res) {
    const { id } = req.params;
    
    const pokemon = await Pokemon.findByPk(id, {
        include: {
            association: "types",
            through: { attributes: [] }
        }
    });

    if (!pokemon) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }

    res.json(pokemon);
}