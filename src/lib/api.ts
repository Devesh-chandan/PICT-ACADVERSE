import axios from "axios";

// Backend origin. VITE_API_URL wins; otherwise localhost in dev and same-origin
// (the Vercel /api function) in production builds.
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "")
).replace(/\/+$/, "");

// Extract a human-readable message from an axios-style error
export const getErrorMessage = (error: unknown, fallback: string): string =>
  (error as { response?: { data?: { error?: string } } })?.response?.data?.error || fallback;

// Create axios instance with base URL
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Multipart bodies need the browser-generated boundary, not our JSON default
    if (config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // A 401 from the auth endpoints just means bad credentials; don't treat it as an expired session
    const isAuthRequest = String(error.config?.url ?? "").startsWith("/auth/");
    if (error.response?.status === 401 && !isAuthRequest) {
      // Token expired or invalid - clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  role: "student" | "admin";
}

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  },

  googleLogin: async (token: string) => {
    const response = await api.post("/auth/google", { token });
    return response.data;
  },

  // Fresh profile from the server (role changes, deleted accounts, expired tokens)
  me: async () => {
    const response = await api.get("/auth/me");
    return response.data as { user: AuthUser };
  },
};

export default api;
