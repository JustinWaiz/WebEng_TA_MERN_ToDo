// React context providing authentication helpers and JWT storage
import { createContext, useContext, useState } from "react";
import * as api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Authenticate the user and persist the token
  const login = async (email, password) => {
    const data = await api.login(email, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  // Register a new user and store the returned token
  const register = async (email, password) => {
    const data = await api.register(email, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  // Clear the token from state and local storage
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
