import React, { createContext, useContext, useState } from "react";
import { isTokenValid } from "./authUtils";
import { useEffect } from "react";

// Define the type for the props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create AuthContext
const AuthContext = createContext(
  {} as {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // If token exists try to log user in
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
      // No token ensure logged out
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth custom hook
export const useAuth = () => useContext(AuthContext);
