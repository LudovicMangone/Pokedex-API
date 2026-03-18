import { Pokemon, Type, sequelize } from "../models/index.js";
import { Op } from "sequelize";

const VOTE_COUNT_ATTRIBUTE = [
    sequelize.literal('(SELECT COUNT(*) FROM votes WHERE votes.pokemon_id = "Pokemon".id)'),
    'voteCount'
];

const COMMON_INCLUDE = {
    association: "types",
    through: { attributes: [] }
};

// GET /pokemons
export async function getAll(req, res) {
    const { name, type } = req.query;

    const queryOptions = {
        order: [['id', 'ASC']],
        where: {},
        attributes: {
            include: [VOTE_COUNT_ATTRIBUTE]
        },
        include: [{ ...COMMON_INCLUDE }]
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

// GET /pokemons/podium

export async function getPodium(req, res) {
    const pokemons = await Pokemon.findAll({
        order: [
            [sequelize.literal('"voteCount"'), 'DESC']
        ],
        limit: 3,
        attributes: {
            include: [VOTE_COUNT_ATTRIBUTE]
        },
        include: [COMMON_INCLUDE]
    })
    res.status(200).json(pokemons);
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

// GET /pokemons/:id1/:id2
export async function compare(req, res) {
    const { id1, id2 } = req.params;
    const queryOptions = {
        where: {
            id: {
                [Op.in]: [id1, id2]
            }
        },
        attributes: {
            include: [VOTE_COUNT_ATTRIBUTE]
        },
        include: [{...COMMON_INCLUDE}]
    } 
    const pokemons = await Pokemon.findAll(queryOptions);
    if (pokemons.length !== 2) {
        return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json(pokemons);
}