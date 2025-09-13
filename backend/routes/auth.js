// Routes for authentication actions
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", register);
// Authenticate an existing user
router.post("/login", login);

export default router;
