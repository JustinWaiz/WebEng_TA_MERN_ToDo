// Display a single todo item card with actions
import React from "react";

export default function TodoCard({
  todo,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <div
      id={`todo-${todo.id}`}
      className={`card category-${todo.category}`}
      draggable
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, todo.id)}
    >
      <div className="card-body">
        <div className="card-header">
          <span className="drag-handle">☰</span>
          {todo.icon && (
            <img src={todo.icon} alt="Task icon" className="todo-icon" />
          )}
          <strong className="todo-title">{todo.title}</strong>
          <br />
          <span className="todo-due-date">Due: {todo.dueDate || "-"}</span>
        </div>
        <p className="todo-description">{todo.description || ""}</p>
      </div>
      <div className="todo-meta">
        <label>
          <input type="checkbox" checked={todo.completed} readOnly /> Done
        </label>
        <span className="todo-category">{todo.category}</span>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary edit" onClick={() => onEdit(todo)}>
          <i className="fa-solid fa-edit"></i>
        </button>
        <button
          className="btn btn-secondary delete"
          onClick={() => onDelete(todo)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
