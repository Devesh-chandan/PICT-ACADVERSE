// Central place for required configuration so a missing secret fails loudly
// instead of silently falling back to a publicly known value.
export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Add it to .env (or the hosting provider's environment variables).");
  }
  return secret;
};

const REQUIRED = [
  "MONGO_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

/** Names of required variables that are empty or still unset. */
export const getMissingConfig = () => REQUIRED.filter((key) => !process.env[key]?.trim());

// Origins allowed to call the API. Extra origins can be supplied as a
// comma-separated list in ALLOWED_ORIGINS.
const DEFAULT_ORIGINS = ["http://localhost:5173", "https://pictacadverse.vercel.app"];

export const getAllowedOrigins = () => [
  ...DEFAULT_ORIGINS,
  ...(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
];

// Vercel preview deployments are https://<something>.vercel.app
export const isVercelPreview = (origin) => {
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};
