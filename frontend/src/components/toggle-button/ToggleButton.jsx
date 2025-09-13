// Button that collapse or expands the sidebar
export default function ToggleButton({ onClick }) {
  return (
    <button
      id="toggle-aside"
      className="toggle-aside-btn"
      aria-label="Toggle navigation"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 6L4 12l4 6M16 6l4 6-4 6M12 4v16"
        />
      </svg>
    </button>
  );
}
