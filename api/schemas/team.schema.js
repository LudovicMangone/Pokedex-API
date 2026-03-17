import Joi from "joi";

// Schéma pour la création (POST)
export const createTeamSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    description: Joi.string().max(255).required(),
    user_id: Joi.number().integer().positive().required()
});

// Schéma pour la mise à jour (PATCH)
export const updateTeamSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50),
    description: Joi.string().max(255).allow('', null)
}).min(1);