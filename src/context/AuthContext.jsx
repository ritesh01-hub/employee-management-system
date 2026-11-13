import { useState } from 'react'
import { AuthContext } from './contexts'
import {
  getUsers,
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
} from '../utils/localStorage'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())

  const login = (email, password) => {
    const found = getUsers().find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    )

    if (!found) {
      return { success: false, message: 'Invalid email or password' }
    }

    const safeUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    }

    saveCurrentUser(safeUser)
    setUser(safeUser)
    return { success: true }
  }

  const logout = () => {
    clearCurrentUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}