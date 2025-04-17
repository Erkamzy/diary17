
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
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user exists
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      // Store logged in user in localStorage (excluding password)
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (existingUsers.some((user: any) => user.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = { id: Date.now().toString(), name, email, password };
    
    // Add to users array
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Set as current user (excluding password)
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setIsAuthenticated(true);
    
    return true;
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
