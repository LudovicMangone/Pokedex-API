import { sequelize } from "../database/sequelize-client.js";
import Pokemon from "./pokemon.js";
import Type from "./type.js";
import User from "./user.js";
import Team from "./team.js";
import Vote from "./vote.js";


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

User.hasMany(Team,{
    foreignKey: "user_id",
    as: "teams",
    onDelete: "CASCADE"
})

Team.belongsTo(User,{
    foreignKey: "user_id",
    as: "user"
})

Team.belongsToMany(Pokemon,{
    foreignKey: "team_id",
    as: "pokemons",
    through: "team_pokemon",
    otherKey: "pokemon_id"
})

Pokemon.belongsToMany(Team,{
    foreignKey: "pokemon_id",
    as: "teams",
    through: "team_pokemon",
    otherKey: "team_id"
})

User.belongsToMany(Pokemon, {
    through: Vote,
    foreignKey: "user_id",
    otherKey: "pokemon_id",
    as: "votedPokemons"
})

Pokemon.belongsToMany(User, {
    through: Vote,
    foreignKey: "pokemon_id",
    otherKey: "user_id",
    as: "voters"
});

export { Pokemon, Type, User, Team, Vote, sequelize}
