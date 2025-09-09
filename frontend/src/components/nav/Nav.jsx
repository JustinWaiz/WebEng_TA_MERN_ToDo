import ThemeButton from "../theme-button/ThemeButton";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Nav({ onToggleTheme }) {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Manage your tasks</h1>
      <div className="navbar-links">
        <ThemeButton onClick={onToggleTheme} />
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
        <a href="https://github.com/JustinWaiz/js-todo-app" target="_blank">
          <img src="/img/github.png" alt="Github" className="github-logo" />
        </a>
      </div>
    </nav>
  );
}
