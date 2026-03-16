import "dotenv/config"
import express from "express";
import cors from "cors";
import {teamRouter} from "./routers/teamRouter.js"

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API Pokedex !")
});

app.use("/teams", teamRouter);

app.listen(PORT, () => {
    console.log(`L'API est en cours d'exécution sur http://localhost:${PORT}`);
});

