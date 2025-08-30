import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard";
import TodoModal from "./components/TodoModal";
import ToggleButton from "./components/ToggleButton";
import Nav from "./components/Nav";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import ActionButton from "./components/ActionButton";

export default function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
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
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const handleSave = (todo) => {
    if (editing) {
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
    } else {
      setTodos((prev) => [...prev, todo]);
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleEdit = (todo) => {
    setEditing(todo);
    setShowModal(true);
  };

  const handleDelete = (todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  const handleDragStart = (e, id) => {
    setDraggedId(id);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;
    const newTodos = [...todos];
    const fromIndex = newTodos.findIndex((t) => t.id === draggedId);
    const toIndex = newTodos.findIndex((t) => t.id === targetId);
    const [moved] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, moved);
    setTodos(newTodos);
    setDraggedId(null);
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
