import Joi from "joi";
import { joiValidator } from "../utils/common.utils.js";

export function controllerHandler(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}
export function errorHandler(err, req, res, next) {
  let response = {
    error: true,
    message: "The server has failed, please try again."
  }

  if(process.env.NODE_ENV === 'dev') {
    response.message = err.message;
    response.stack = err.stack;
  }
  res.status(500).json(response);
  next();
}

export function notFoundHandler(req, res, next) {
  res.status(404).json({error: "Route Not Found"});
  next();
}

export function validateSchema(schema) {
    return (req, res, next) => {
        const validationResponse = joiValidator(schema, req.body);
        
        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                details: validationResponse.details.map(d => d.message)
            });
        }
        next();
    };
}

export function validateId(paramName = "id") {
    return (req, res, next) => {
        const schema = Joi.object({
            [paramName]: Joi.number().integer().positive().required()
        });

        const validationResponse = joiValidator(schema, {
            [paramName]: req.params[paramName]
        });

        if (validationResponse !== true) {
            return res.status(400).json({
                message: `Le paramètre '${paramName}' est invalide dans l'URL.`,
                details: validationResponse.details.map(d => d.message)
            });
        }

        next();
    };
}