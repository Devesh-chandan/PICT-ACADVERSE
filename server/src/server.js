import "./config/loadEnv.js";
import app from "./app.js";
import { getJwtSecret, getMissingConfig } from "./config/env.js";

// Fail fast on a missing secret instead of at the first login attempt
getJwtSecret();

const missing = getMissingConfig();
if (missing.length) {
  console.warn(`Missing configuration in .env: ${missing.join(", ")}. Affected routes will fail until it is set.`);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
