# MERN To-Do App

A full-stack to-do list application with a React frontend and an Express/MongoDB backend. Check out the **[live demo](https://webeng-ta-mern-todo.onrender.com/)** 🚀

## Features ✨

- 🔐 Email/password authentication with registration, login and logout flows secured by JWT tokens
- 👥 Private to-do lists per user with all CRUD endpoints protected by authentication middleware
- 📝 Create, edit and delete tasks with titles, descriptions, categories, due dates and optional custom icons
- ✅ Toggle completion, search by keyword and filter tasks by state (all, active, completed) or category
- ↕️ Drag-and-drop reordering with the updated order persisted for consistent lists across sessions
- 🌗 Light/dark theme toggle with the selected preference stored in `localStorage`
- 📱 Responsive layout featuring a collapsible sidebar and floating action button for quick task creation on smaller screens
- 💾 Data stored in `MongoDB` via an Express + Mongoose backend API

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
