// Routes for todo resource operations
import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

// Retrieve all todos
router.get("/", getTodos);
// Create a new todo
router.post("/", createTodo);
// Update a todo by id
router.put("/:id", updateTodo);
// Delete a todo by id
router.delete("/:id", deleteTodo);

export default router;
