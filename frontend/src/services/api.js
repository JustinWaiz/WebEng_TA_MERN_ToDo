const base = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(base + path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

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

export const getTodos = (token) =>
  request("/todos", { headers: { Authorization: `Bearer ${token}` } });

export const createTodo = (token, todo) =>
  request("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

export const updateTodo = (token, todo) =>
  request(`/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

export const deleteTodo = (token, id) =>
  request(`/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

export default base;
