import { sequelize } from "../database/sequelize-client.js";
import Pokemon from "./pokemon.js";
import Type from "./type.js";


Pokemon.belongsToMany(Type,{
    foreignKey: "pokemon_id",
    as: "types",
    through: "pokemon_type",
    otherKey: "type_id"
})

Type.belongsToMany(Pokemon,{
    foreignKey: "type_id",
    as: "pokemons",
    through: "pokemon_type",
    otherKey: "pokemon_id"
})

export { Pokemon, Type, sequelize}

/* try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
} */