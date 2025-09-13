import { useEffect, useState } from "react";
import TodoCard from "./components//todo/TodoCard";
import TodoModal from "./components/modal/TodoModal";
import ToggleButton from "./components/toggle-button/ToggleButton";
import Nav from "./components/nav/Nav";
import Aside from "./components//aside/Aside";
import Footer from "./components/footer/Footer";
import ActionButton from "./components/action-button/ActionButton";
import Auth from "./components/auth/Auth";
import { useAuth } from "./context/AuthContext.jsx";
import * as api from "./services/api.js";

export default function App() {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchTodos = async () => {
    try {
      const data = await api.getTodos(token);
      setTodos(data.map((t) => ({ ...t, id: t._id })));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (category !== "all" && todo.category !== category) return false;
    if (search.trim()) {
      const keyword = search.toLowerCase();
      if (
        !todo.title.toLowerCase().includes(keyword) &&
        !todo.description.toLowerCase().includes(keyword)
      )
        return false;
    }
    return true;
  });

  const handleSave = async (todo) => {
    try {
      if (editing) {
        const updated = await api.updateTodo(token, todo);
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todo.id ? { ...updated, id: updated._id } : t
          )
        );
      } else {
        const created = await api.createTodo(token, todo);
        setTodos((prev) => [...prev, { ...created, id: created._id }]);
      }
    } catch (err) {
      console.error(err);
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleEdit = (todo) => {
    setEditing(todo);
    setShowModal(true);
  };

  const handleDelete = async (todo) => {
    try {
      await api.deleteTodo(token, todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragStart = (e, id) => {
    setDraggedId(id);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;
    const newTodos = [...todos];
    const fromIndex = newTodos.findIndex((t) => t.id === draggedId);
    const toIndex = newTodos.findIndex((t) => t.id === targetId);
    const [moved] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, moved);
    const reordered = newTodos.map((t, index) => ({ ...t, order: index }));
    setTodos(reordered);
    setDraggedId(null);
    try {
      await Promise.all(
        reordered.map((t) => api.updateTodo(token, { ...t, id: t.id }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAside = () => {
    document.body.classList.toggle("aside-collapsed");
  };

  const openModal = () => {
    setEditing(null);
    setShowModal(true);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  if (!token) {
    return <Auth />;
  }

  return (
    <>
      <ToggleButton onClick={toggleAside} />
      <Nav onToggleTheme={toggleTheme} />
      <Aside
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        openModal={openModal}
      />
      <main>
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </main>
      <Footer />
      <ActionButton className="floating-action-button" onClick={openModal} />
      <div className="filter-container">
        <div className="filter-item">
          <select
            id="category-filter-2"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="work">Work</option>
            <option value="private">Private</option>
            <option value="school">School</option>
          </select>
        </div>
        <div className="filter-item">
          <select
            id="state-filter"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <TodoModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        onSave={handleSave}
        todo={editing}
      />
    </>
  );
}
