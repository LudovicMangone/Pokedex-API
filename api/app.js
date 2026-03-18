import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';
import "dotenv/config"
import express from "express";
import cors from "cors";
import { teamRouter } from "./routers/teamRouter.js"
import { pokemonRouter } from "./routers/pokemonRouter.js";
import { typeRouter } from "./routers/typeRouter.js";
import { authRouter } from "./routers/authRouter.js";
import { notFoundHandler, errorHandler } from "./middlewares/common.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API Pokedex !")
});
app.use("/auth", authRouter);
app.use("/pokemons", pokemonRouter);
app.use("/types", typeRouter);
app.use("/teams", teamRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`L'API est en cours d'exécution sur http://localhost:${PORT}`);
});

