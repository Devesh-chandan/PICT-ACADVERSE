import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Google sign-in is optional: without a client id the provider (and its script) is not loaded at all
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

const app = (
  <AuthProvider>
    <App />
  </AuthProvider>
);

createRoot(document.getElementById("root")!).render(
  GOOGLE_CLIENT_ID ? <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{app}</GoogleOAuthProvider> : app
);
