import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, getErrorMessage, type AuthUser } from "@/lib/api";
import { toast } from "sonner";

type User = AuthUser;

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  googleLogin: (credential: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        // Corrupted storage - treat as logged out
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);

    // Re-validate the session in the background: picks up role changes (e.g. promoted to
    // admin) and drops sessions whose token expired or whose account was deleted.
    if (storedToken && storedUser) {
      authAPI
        .me()
        .then(({ user: fresh }) => {
          localStorage.setItem("user", JSON.stringify(fresh));
          setUser(fresh);
        })
        .catch((error) => {
          if ((error as { response?: { status?: number } })?.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
          }
          // Network errors keep the cached session so the app still works offline
        });
    }
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
      return data.user;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "Login failed");
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
      return data.user;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "Registration failed");
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
      return data.user;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "Google Sign-In failed");
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
    isAdmin: user?.role === "admin",
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
