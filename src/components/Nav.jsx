import ThemeButton from "./ThemeButton";

export default function Nav({ onToggleTheme }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Manage your tasks</h1>
      <div className="navbar-links">
        <ThemeButton onClick={onToggleTheme} />
        <a href="https://github.com/JustinWaiz/js-todo-app" target="_blank">
          <img src="/img/github.png" alt="Github" className="github-logo" />
        </a>
      </div>
    </nav>
  );
}
