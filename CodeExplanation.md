# Code Overview

This document summarizes the main pieces of logic inside this project.

## Structure

The application consists of a single HTML page (`index.html`) which loads the script `js/index.js` that contains the core logic. Styling is provided by `styles.css` and `variables.css`, while small reusable templates live in `html/components/`.

## Main Classes

### `Todo`

Represents a single task. It stores a task's title, description, category and so on. The constructor and JSON helpers are defined in `index.js`:

```javascript
class Todo {
  constructor(
    id,
    title,
    description,
    category,
    dueDate,
    completed = false,
    icon = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.dueDate = dueDate;
    this.completed = completed;
    this.icon = icon;
  }
  static fromJSON(json) {
    /* ... */
  }
  toJSON() {
    /* ... */
  }
}
```

### `StorageService`

Handles persistence of todos using `localStorage`. Items are created, updated and deleted via this service:

```javascript
class StorageService {
  constructor(key) {
    this.key = key;
    this.items = this._getStoredItems();
  }
  create(item) {
    /* adds a new item and stores it */
  }
  update(updatedItem) {
    /* merges changes into stored item */
  }
  delete(id) {
    /* removes a todo */
  }
}
```

### `ModalService`

Manages the bootstrap modal that is used to create and edit tasks. It binds input fields and wires up the save button:

```javascript
class ModalService {
  initialize() {
    this.modalElement = document.querySelector("#todo-modal");
    this.modal = new bootstrap.Modal(this.modalElement);
    // gather all form elements here
    this._initializeEventListeners();
  }
  _handleSave() {
    /* collects form data and invokes callbacks */
  }
}
```

### `TodoRenderService`

Responsible for rendering todo cards into the main container and enabling drag & drop reordering:

```javascript
class TodoRenderService {
  renderTodos(todos, container, onEdit, onDelete) {
    container.innerHTML = "";
    todos.forEach((todo) => {
      const card = document.createElement("div");
      card.innerHTML = this._renderTodoCard(todo);
      container.appendChild(card.firstChild);
    });
    this._enableDragAndDrop(container, onEdit, onDelete);
  }
}
```

## Application Flow

The bottom of `index.js` contains an immediately invoked function that wires everything together. It creates instances of the services, loads todos from storage and registers UI event listeners:

```javascript
(() => {
  const storage = new StorageService("todos");
  const modal = new ModalService(createTodo, updateTodo);
  const renderService = new TodoRenderService();

  modal.initialize();
  renderTodos();

  // ... handlers for creating, updating and filtering todos ...
})();
```

The event listeners control filtering by completion state and category, searching by keywords and toggling between light and dark themes.

## Feature Breakdown

Below is a high level overview of how the main features listed in the README are implemented:

- **Add tasks** – The `ModalService` collects values for title, description, category, due date and an optional icon. Once saved, `StorageService.create` persists the new `Todo` object and the UI is refreshed via `renderTodos()`.
- **Edit or delete tasks** – Action buttons in each card trigger callbacks wired in `_enableDragAndDrop`. Editing fills the modal with the current values and calls `StorageService.update`, while deleting removes the item using `StorageService.delete`.
- **Mark as completed and filter by state** – Each todo has a `completed` checkbox. The current state is stored on the item and the `applyFilter` function filters tasks by _all_, _active_ or _completed_ based on UI controls.
- **Filter by category and search** – Drop‑downs and the search input update `currentCategory` and `currentSearch`. `applyFilter` then narrows the list to matching categories and keywords.
- **Drag & drop reordering** – `TodoRenderService._enableDragAndDrop` attaches drag handlers to each card. Dropping a card updates the DOM order and calls `StorageService.reorder` to persist the new sequence.
- **Toggle light/dark themes** – Clicking the theme toggle button toggles the `dark-theme` class on the body. The chosen theme is stored in `localStorage` so it persists across reloads.
- **Collapsible sidebar** – A button toggles the `aside-collapsed` class on the `<body>` to show or hide the sidebar on smaller screens.
- **Data persistence** – All CRUD operations in `StorageService` read from and write to `localStorage`, ensuring tasks remain after a page refresh.

## Further Information

For a feature list and repository layout, see the [README](README.md).
