import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loadAuthData = () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setToken(storedToken);
    } catch (error) {
      console.error("Error getting auth data", error);
    }
  };

  const storeAuthData = (userData, userToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", JSON.stringify(userToken));
    setUser(userData);
    setToken(userToken);
  };

  const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, storeAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
