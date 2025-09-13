// Top navigation bar with theme toggle and logout
import ThemeButton from "../theme-button/ThemeButton";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Nav({ onToggleTheme }) {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Manage your tasks</h1>
      <div className="navbar-links">
        <ThemeButton onClick={onToggleTheme} />
        <button className="logout-button" onClick={logout} aria-label="Logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="logout-icon"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </button>
        <a href="https://github.com/JustinWaiz/js-todo-app" target="_blank">
          <img src="/img/github.png" alt="Github" className="github-logo" />
        </a>
      </div>
    </nav>
  );
}
