import { sequelize, Pokemon, Type, User, Team } from "./models/index.js";
import { pokemonsList, typesList } from "./data/pokemons-list.js";

async function runSeed() {
  try {
    console.log("🚿 Nettoyage de la base de données...");
    // Force: true supprime les tables et les recrée selon nos models
    await sequelize.sync({ force: true });

    // --- 1. INSERTION DES TYPES ---
    console.log("🧪 Insertion des types...");
    const createdTypes = await Type.bulkCreate(typesList);
    
    // On crée un dictionnaire pour retrouver facilement un objet Type par son ID
    const typesMap = {};
    createdTypes.forEach(t => {
      typesMap[t.id] = t;
    });

    // --- 2. INSERTION DES POKEMONS & LIAISONS TYPES ---
    console.log("🐢 Insertion des 151 Pokémons et de leurs types...");
    for (const pData of pokemonsList) {
      // On sépare le tableau 'types' du reste des stats
      const { types, ...pokeStats } = pData;
      
      // Création du Pokémon
      const pokemon = await Pokemon.create(pokeStats);
      
      // Si le Pokémon à des types, on les lie via la table pivot
      if (types && types.length > 0) {
        const typeInstances = types.map(id => typesMap[id]);
        await pokemon.addTypes(typeInstances);
      }
    }

    // --- 3. DONNÉES DE TEST (Utilisateurs & Teams) ---
    console.log("👤 Création d'un utilisateur de test...");
    const user = await User.create({
      email: "ludo@pokedex.com",
      password: "password123",
      firstName: "Ludovic",
      lastName: "Mangone"
    });

    console.log("🏆 Création d'une équipe de test...");
    const team = await Team.create({
      name: "Ma Team Légendaire",
      description: "Une équipe pour tester les associations",
      user_id: user.id
    });

    // On ajoute Mew (ID 151) et Mewtwo (ID 150) à l'équipe
    const mewtwo = await Pokemon.findByPk(150);
    const mew = await Pokemon.findByPk(151);
    await team.addPokemons([mewtwo, mew]);

    console.log("✨ SEEDING TERMINÉ AVEC SUCCÈS ! ✨");

  } catch (error) {
    console.error("❌ Erreur pendant le seeding :", error);
  } finally {
    await sequelize.close();
  }
}

runSeed();