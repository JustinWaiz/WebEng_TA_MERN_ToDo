# JavaScript To-Do App

A full-stack to-do list application with a React frontend and an Express/MongoDB backend. Check out the **[live demo](https://js-todo-app-ry7r.onrender.com/)** 🚀

## Features ✨

- ➕ Add tasks with a title, description, category, due date and optional icon
- ✏️ Edit or delete existing tasks
- ✅ Mark tasks as completed and filter by state (all, active, completed)
- 🔍 Filter tasks by category and search by keywords
- ↕️ Drag & drop to reorder tasks
- 🌗 Toggle between light and dark themes
- 📱 Collapsible sidebar for smaller screens
- 💾 Data persisted using `MongoDB`

## Project Structure

- `frontend/` – React client built with Vite
- `backend/` – Express server using Mongoose for MongoDB

## Getting Started 🚀

1. Install dependencies for each part:
   - `cd frontend && npm install`
   - `cd backend && npm install`
2. Start the backend server:
   - `npm start` (from the `backend` folder)
3. Start the frontend dev server:
   - `npm run dev` (from the `frontend` folder)

The frontend expects the API to be available on `http://localhost:4000` by default.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
