import Joi from "joi";

// Schéma pour l'inscription (signup)
export const createUserSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required()
});

// Schéma pour la connexion (login)
export const loginUserSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
});