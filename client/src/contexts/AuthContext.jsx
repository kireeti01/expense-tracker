import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Persist login on refresh
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Dummy register — just sets auth true (no user data saved)
  const register = (name, email, password) => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  };

  // Dummy login — accepts ANY credentials, logs in
  const login = (email, password) => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
    return true;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
