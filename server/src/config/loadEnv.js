import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

// One .env at the project root configures everything. Vite only exposes the
// VITE_* variables to the browser, so server secrets in the same file stay private.
// Variables already present in the environment (hosting provider, tests) win.
dotenv.config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)), quiet: true });
