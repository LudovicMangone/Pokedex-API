import { Team } from "../models/index.js";

export async function isTeamOwner(req, res, next) {
    const teamId = req.params.teamId || req.params.id;
    const userId = req.user.userId;

    const team = await Team.findByPk(teamId);

    if (!team) {
        return res.status(404).json({ message: "Équipe introuvable." });
    }
    console.log("ID utilisateur du Token :", userId, typeof userId);
console.log("ID propriétaire en DB :", team.user_id, typeof team.user_id);

    if (Number(team.user_id) !== Number(userId)) {
        console.log(`Propriétaire attendu: ${team.user_id}, Utilisateur actuel: ${userId}`); // Petit log pour débugger au cas où
        return res.status(403).json({ message: "Accès interdit : vous n'êtes pas le propriétaire." });
    }

    req.team = team;
    next();
}