import React, { createContext, useContext, useState } from "react";
import { isTokenValid } from "./authUtils";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext(
  {} as {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Check token
    if (token) {
      if (isTokenValid(token)) {
        setIsLoggedIn(true);
      } else {
        // Token expired or invalid, clear it from storage and log out
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("author");
        setIsLoggedIn(false);
      }
    } else {
      // No token log out
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
