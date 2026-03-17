import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validateSchema } from "../middlewares/common.middleware.js";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";

const router = Router();

// POST /auth/signup 
router.post("/signup", validateSchema(createUserSchema), authController.create);

// POST /auth/login 
router.post("/login", validateSchema(loginUserSchema), authController.login);

export { router as authRouter };