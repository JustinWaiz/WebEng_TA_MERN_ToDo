import { createContext, useContext, useState } from 'react'
import * as api from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = async (email, password) => {
    const data = await api.login(email, password)
    setToken(data.token)
    localStorage.setItem('token', data.token)
  }

  const register = async (email, password) => {
    const data = await api.register(email, password)
    setToken(data.token)
    localStorage.setItem('token', data.token)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
