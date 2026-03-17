import { Pokemon, Type } from "../models/index.js";
import { Op } from "sequelize";

// GET /pokemons
export async function getAll(req, res) {
    const { name, type } = req.query;

    const queryOptions = {
        order: [['id', 'ASC']],
        where: {},
        include: [
            {
                association: "types",
                through: { attributes: [] },
                where: {}
        }]
    };

    if (name) {
        queryOptions.where.name = {
            [Op.iLike]: `%${name}%`
        };
    }
    if (type) {
        queryOptions.include[0].where.name = {
            [Op.iLike]: `%${type}%`
        }
    } else {
        delete queryOptions.include[0].where;
    }

    const pokemons = await Pokemon.findAll(queryOptions);
    
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