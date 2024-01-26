import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [username, setUsername] = useState(null)

  const login = token => {
    Cookies.set('auth_user', token, { expires: 7 })
    const info = jwt.decode(token)
    if (info != null) {
      setUserId(info.ret._id)
      setAdmin(info.ret.admin)
      setUsername(info.ret.fullName)
    }
  }

  const logout = () => {
    Cookies.remove('auth_user')
    setUserId(null)
    setAdmin(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ userId, admin, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
