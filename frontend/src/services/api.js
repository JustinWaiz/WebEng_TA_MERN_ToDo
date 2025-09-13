// Base URL for API requests (configurable via Vite environment)
const base = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Helper to perform fetch requests and parese JSON responses
async function request(path, options = {}) {
  const res = await fetch(base + path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// Authentication calls
export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const register = (email, password) =>
  request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

// Todo API calls
export const getTodos = (token) =>
  request("/todos", { headers: { Authorization: `Bearer ${token}` } });

// Create a new todo
export const createTodo = (token, todo) =>
  request("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

// Update an existing todo by id
export const updateTodo = (token, todo) =>
  request(`/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

// Delete a todo by id
export const deleteTodo = (token, id) =>
  request(`/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

export default base;
