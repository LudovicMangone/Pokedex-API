import { User } from "../models/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


// POST /users 
export async function create(req, res) {
    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        firstName,
        lastName
    });

    res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
}

// POST /users/login
export async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });

    if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.json({
        message: "Connexion réussie !",
        token: token,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }
    });
}