export default function ActionButton({ className = "", onClick }) {
  return (
    <a
      href=""
      className={`action-button ${className}`.trim()}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    ></a>
  );
}
