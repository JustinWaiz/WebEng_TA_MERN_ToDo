// Express application configuration and middleware setup
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
// Allow cross-origin requests
app.use(cors());
// Parse JSON request bodies with a size limit of 10MB
app.use(express.json({ limit: "10mb" }));

// Public authentication routes
app.use("/api/auth", authRoutes);
// Protected todo routes require valid JWT
app.use("/api/todos", authMiddleware, todoRoutes);

export default app;
