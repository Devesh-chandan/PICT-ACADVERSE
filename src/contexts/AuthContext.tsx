import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-login on mount if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authAPI.login(email, password);

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      toast.success("Login successful!", { description: `Welcome back, ${data.user.name}` });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error("Login Failed", { description: errorMessage });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await authAPI.register(name, email, password);

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      toast.success("Registration successful!", { description: `Welcome, ${data.user.name}` });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      toast.error("Registration Failed", { description: errorMessage });
      throw error;
    }
  };

  const googleLogin = async (credential: string) => {
    try {
      const data = await authAPI.googleLogin(credential);

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      toast.success("Google Sign-In successful!", { description: `Welcome, ${data.user.name}` });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Google Sign-In failed";
      toast.error("Google Sign-In Failed", { description: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    token,
    login,
    register,
    googleLogin,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
