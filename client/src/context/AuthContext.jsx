import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 1. LOGIN FUNCTION (Mock)
  const login = (email, password) => {
    // In real backend, we would verify password here.
    // For now, we just simulate a successful login.
    const mockUser = { name: "Vinay", email: email, role: "user" };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true; // Success
  };

  // 2. LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 3. REGISTER FUNCTION (Mock)
  const register = (name, email, password) => {
    const mockUser = { name: name, email: email, role: "user" };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);