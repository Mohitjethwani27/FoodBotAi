// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  // ✅ Function to check auth status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setLoggedInUser(data.username);
      } else {
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setLoggedInUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // ✅ Provide checkAuthStatus function to components
  const value = {
    loggedInUser,
    setLoggedInUser,
    loading,
    checkAuthStatus, // ✅ This allows manual auth refresh
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
