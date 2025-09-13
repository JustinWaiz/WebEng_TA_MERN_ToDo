import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort("order");
  res.json(todos);
};

export const createTodo = async (req, res) => {
  try {
    const order = await Todo.countDocuments({ user: req.userId });
    const todo = await Todo.create({
      ...req.body,
      order,
      user: req.userId,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};
