# ⚡ Pokedex API RESTful

Une API complète et sécurisée permettant de consulter un catalogue de Pokémons, de créer des équipes personnalisées et de voter pour ses Pokémons favoris. 

Ce projet a été développé dans le but de mettre en œuvre une architecture **MVC**, de concevoir une base de données relationnelle robuste avec **PostgreSQL**, et d'appliquer les standards de sécurité modernes (JWT, hachage).

## 🚀 Fonctionnalités principales

* **👤 Authentification & Autorisation :** Inscription et connexion sécurisées via JWT (JSON Web Tokens). Mots de passe hachés avec Argon2.
* **🛡️ Gestion des équipes (Teams) :** Création et modification d'équipes de Pokémons. Sécurité renforcée par des *Guards* : seul le créateur d'une équipe peut la modifier. Limite stricte fixée à 6 Pokémons maximum par équipe.
* **🐢 Catalogue Pokémon :** Consultation de l'ensemble des Pokémons avec des filtres de recherche dynamiques (par nom ou par type) et possibilité de comparer les statistiques de deux Pokémons.
* **🏆 Système de votes :** Les utilisateurs connectés peuvent voter pour leurs Pokémons préférés (un seul vote par utilisateur et par Pokémon). Un endpoint dédié permet de consulter le podium des meilleurs Pokémons.
* **📖 Documentation interactive :** Interface Swagger complète pour explorer et tester toutes les routes de l'API directement depuis un navigateur.

## 🛠️ Technologies utilisées

* **Environnement & Serveur :** Node.js, Express
* **Base de données :** PostgreSQL, ORM Sequelize
* **Sécurité & Validation :** 
    * *Joi* (Validation des données entrantes)
    * *Argon2* (Hachage des mots de passe)
    * *JSON Web Token* (Authentification par Token)
* **Documentation :** Swagger (OpenAPI 3.0)

## ⚙️ Installation et Lancement local

### Prérequis
* Node.js (v18 ou supérieur)
* PostgreSQL installé et en cours d'exécution sur votre machine

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/LudovicMangone/pokedex-api.git
   cd pokedex-api/api
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement :**
   
   Copiez le fichier d'exemple fourni pour créer votre propre fichier de configuration.
   ```bash
   cp .env.example .env
   ```
   Ouvrez ensuite le fichier `.env` et modifiez la variable `PG_URL` avec vos propres identifiants PostgreSQL.

4. **Initialiser ou réinitialiser la base de données :**
   
   Cette commande initialise la base de données (ou la réinitialise si besoin). Elle génère les tables et insère les 151 premiers Pokémons ainsi que leurs types.
   ```bash
   npm run db:reset
   ```

5. **Lancer le serveur (Mode Développement) :**
   ```bash
   npm run dev
   ```

### Variables d'environnement

Voici les variables principales à configurer dans votre fichier `.env` :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `PG_URL` | URL de connexion à PostgreSQL | `postgres://user:pass@localhost:5432/db-name` |
| `PORT`   | Port du serveur (optionnel) | `3000` |
| `JWT_SECRET` | Clé secrète pour la signature des tokens | `votre_super_secret` |
   
L'API sera alors accessible à l'adresse suivante : http://localhost:3000

## 📚 Documentation de l'API (Swagger)

Une fois le serveur lancé, la documentation interactive complète est disponible à l'adresse suivante :
👉 **`http://localhost:3000/api-docs`**

Vous y trouverez le détail de tous les endpoints (`/auth`, `/pokemons`, `/teams`, `/types`), les schémas attendus et pourrez tester l'API en direct. N'oubliez pas d'ajouter votre token JWT généré lors du login dans le cadenas "Authorize" pour tester les routes protégées.

## 🗂️ Architecture du projet

L'application respecte le motif de conception **MVC (Modèle-Vue-Contrôleur)** :
* `api/controllers/` : Logique métier des différentes routes.
* `api/models/` : Définition des schémas de base de données (Sequelize).
* `api/routers/` : Définition des points d'entrée (endpoints) de l'API.
* `api/middlewares/` : Gestion des erreurs, validation des schémas (Joi), vérification des tokens et Guards.
* `api/docs/` : Configuration et définition centralisée de Swagger (YAML).

## 🗺️ Évolutions et Roadmap

Ce projet a été développé de manière itérative. Pour découvrir comment l'API a été construite (du MVP jusqu'à l'implémentation de la sécurité) et voir les fonctionnalités prévues pour l'avenir, consultez ma **[Roadmap détaillée](./roadmap.md)**.

## ✍️ Auteur

* **Ludovic Mangone**
