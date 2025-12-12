import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('_on_token');
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
    console.log(!!token)
  }, [])

  const login = (token: string) => {
    localStorage.setItem('_on_token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('_on_token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}