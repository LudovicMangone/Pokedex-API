# 🗺️ Roadmap du Projet : Pokedex API

Ce document retrace l'évolution du développement de l'API Pokedex. Le projet a été construit de manière itérative, en commençant par un produit minimum viable (MVP) pour aller vers une API sécurisée et documentée.

## ✅ Phase 1 : MVP (Minimum Viable Product)
L'objectif initial était de mettre en place l'architecture de base (MVC) et les fonctionnalités fondamentales de gestion des équipes.

- [x] Initialisation du serveur Express et de la base de données PostgreSQL.
- [x] Configuration de l'ORM Sequelize et définition des modèles de base (`Pokemon`, `Type`, `Team`).
- [x] **CRUD Équipes :** Création des routes pour lister, créer, modifier et supprimer des équipes.
- [x] **Relations :** Création des routes pour ajouter ou retirer un Pokémon d'une équipe spécifique.

## ✅ Phase 2 : Authentification & Sécurité
Une fois la base fonctionnelle, l'objectif était de sécuriser l'application et de l'isoler par utilisateur.

- [x] Ajout du modèle `User`.
- [x] Mise en place de l'inscription (Signup) avec hachage des mots de passe via **Argon2**.
- [x] Mise en place de la connexion (Login) avec génération de **Token JWT**.
- [x] Sécurisation des routes sensibles via un middleware vérifiant la validité du JWT.

## ✅ Phase 3 : Logique Métier & Documentation (Version Actuelle)
Cette phase visait à affiner les règles de gestion, améliorer l'UX développeur et ajouter des fonctionnalités sociales.

- [x] **Règles métier :** Limitation stricte des équipes à 6 Pokémons maximum.
- [x] **Guards (Autorisation) :** Implémentation de middlewares garantissant qu'un utilisateur ne peut modifier ou supprimer *que* ses propres équipes.
- [x] **Système de Votes :**
  - [x] Permettre aux utilisateurs connectés de voter pour leurs Pokémons favoris.
  - [x] Restreindre le vote à 1 seul par utilisateur et par Pokémon.
  - [x] Création d'un endpoint pour générer un podium (Top Pokémons) basé sur les votes.
- [x] **Documentation :** Intégration de Swagger (OpenAPI) pour documenter et tester facilement tous les endpoints.
