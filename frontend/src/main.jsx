// Entry file that renders the React application
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "/styles.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
