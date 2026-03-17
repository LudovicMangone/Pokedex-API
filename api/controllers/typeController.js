import { Type, Pokemon } from "../models/index.js";

// GET /types -> Liste tous les types
export async function getAll(req, res) {
    const types = await Type.findAll({
        order: [['name', 'ASC']]
    });
    res.json(types);
}

// GET /types/:id -> Un type avec tous ses Pokémons
export async function getOne(req, res) {
    const { id } = req.params;
    
    const type = await Type.findByPk(id, {
        include: {
            association: "pokemons",
            through: { attributes: [] },
            include: "types" 
        }
    });

    if (!type) {
        return res.status(404).json({ message: "Type non trouvé" });
    }

    res.json(type);
}