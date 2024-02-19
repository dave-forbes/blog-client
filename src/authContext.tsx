import React, { createContext, useContext, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth custom hook
export const useAuth = () => useContext(AuthContext);
