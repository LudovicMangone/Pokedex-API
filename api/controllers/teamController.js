import { Team, Pokemon } from "../models/index.js";

// GET /teams
export async function getAll(req, res) {
    const teams = await Team.findAll({ include: "pokemons" });
    res.json(teams);
}

// GET /teams/:id
export async function getOne(req, res) {
    const team = await Team.findByPk(req.params.id, { include: "pokemons" });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
}

// POST /teams
export async function create(req, res) {
    const team = await Team.create(req.body);
    res.status(201).json(team);
}

// PATCH /teams/:id
export async function update(req, res) {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    
    await team.update(req.body);
    res.json(team);
}

// DELETE /teams/:id
export async function destroy(req, res) {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    
    await team.destroy();
    res.status(204).end();
}