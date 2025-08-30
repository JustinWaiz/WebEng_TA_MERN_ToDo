import { useEffect, useState } from 'react'
import TodoCard from './components/TodoCard'
import TodoModal from './components/TodoModal'

export default function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || [])
  const [filter, setFilter] = useState('all')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [draggedId, setDraggedId] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active' && todo.completed) return false
    if (filter === 'completed' && !todo.completed) return false
    if (category !== 'all' && todo.category !== category) return false
    if (search.trim()) {
      const keyword = search.toLowerCase()
      if (
        !todo.title.toLowerCase().includes(keyword) &&
        !todo.description.toLowerCase().includes(keyword)
      )
        return false
    }
    return true
  })

  const handleSave = (todo) => {
    if (editing) {
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)))
    } else {
      setTodos((prev) => [...prev, todo])
    }
    setShowModal(false)
    setEditing(null)
  }

  const handleEdit = (todo) => {
    setEditing(todo)
    setShowModal(true)
  }

  const handleDelete = (todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id))
  }

  const handleDragStart = (e, id) => {
    setDraggedId(id)
  }
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (e, targetId) => {
    e.preventDefault()
    if (draggedId === null || draggedId === targetId) return
    const newTodos = [...todos]
    const fromIndex = newTodos.findIndex((t) => t.id === draggedId)
    const toIndex = newTodos.findIndex((t) => t.id === targetId)
    const [moved] = newTodos.splice(fromIndex, 1)
    newTodos.splice(toIndex, 0, moved)
    setTodos(newTodos)
    setDraggedId(null)
  }

  const toggleAside = () => {
    document.body.classList.toggle('aside-collapsed')
  }

  const openModal = () => {
    setEditing(null)
    setShowModal(true)
  }

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <button id="toggle-aside" className="toggle-aside-btn" onClick={toggleAside}>
        ☰
      </button>
      <nav className="navbar">
        <h1 className="navbar-logo">Manage your tasks</h1>
        <div className="navbar-links">
          <button
            id="theme-toggle"
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="moon-icon"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="sun-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
          <a href="https://github.com/JustinWaiz/js-todo-app" target="_blank">
            <img src="/img/github.png" alt="Github" className="github-logo" />
          </a>
        </div>
      </nav>
      <aside>
        <a
          href=""
          className="action-button static-action-button"
          onClick={(e) => {
            e.preventDefault()
            openModal()
          }}
        ></a>
        <div className="filter-buttons text-center my-3">
          <button
            className="btn btn-outline-primary filter-btn"
            data-filter="all"
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className="btn btn-outline-info filter-btn"
            data-filter="active"
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className="btn btn-outline-secondary filter-btn"
            data-filter="completed"
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div className="text-center my-3">
          <select
            id="category-filter"
            className="form-select w-auto d-inline-block"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="work">Work</option>
            <option value="private">Private</option>
            <option value="school">School</option>
          </select>
        </div>
        <div className="text-center my-3">
          <input
            type="text"
            id="search-input"
            className="form-control w-75 mx-auto"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </aside>
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
      <footer>
        <p>&copy; 2025 To-Do app</p>
      </footer>
      <a
        href=""
        className="action-button floating-action-button"
        onClick={(e) => {
          e.preventDefault()
          openModal()
        }}
      ></a>
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
          setShowModal(false)
          setEditing(null)
        }}
        onSave={handleSave}
        todo={editing}
      />
    </>
  )
}
