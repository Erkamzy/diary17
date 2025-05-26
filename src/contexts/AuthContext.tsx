import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load currentUser from localStorage on mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      });
      setIsAuthenticated(true);
    }
  }, []);

  // Login calls your backend API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });

      const result = await response.json();

      if (result.resultCode === 200) {
        const userFromApi = result.data[0];

        // Save user data in state and localStorage (exclude password)
        const userData = {
          id: userFromApi.id,
          name: userFromApi.name,
          email: userFromApi.email,
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // You can implement signup logic here similarly, calling your backend API if available
    // For now, just return false to mark unimplemented
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
