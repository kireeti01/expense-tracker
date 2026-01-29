import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('expenseTrackerUser')
    const storedAuth = localStorage.getItem('expenseTrackerAuth')
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email, password) => {
    // For demo purposes, accept any non-empty credentials
    if (email && password) {
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        currency: 'INR',  // Changed from USD to INR
        theme: 'light'
      }
      
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('expenseTrackerUser', JSON.stringify(userData))
      localStorage.setItem('expenseTrackerAuth', 'true')
      return true
    }
    return false
  }

  const register = (userData) => {
    // For demo, just store and login
    const completeUserData = {
      ...userData,
      id: Date.now().toString(),
      currency: 'INR',  // Changed from USD to INR
      theme: 'light'
    }
    
    setUser(completeUserData)
    setIsAuthenticated(true)
    localStorage.setItem('expenseTrackerUser', JSON.stringify(completeUserData))
    localStorage.setItem('expenseTrackerAuth', 'true')
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('expenseTrackerUser')
    localStorage.removeItem('expenseTrackerAuth')
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}