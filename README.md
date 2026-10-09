# Acadverse

Academic resource portal for PICT students: previous-year question papers, notes, lab programs and forum.

**Stack:** React 18 + Vite + TypeScript + Tailwind + shadcn/ui · Express 5 + MongoDB (Mongoose) · Cloudinary file storage · Vercel.

## Setup

Requires Node.js 20+, a MongoDB database (a free [Atlas](https://www.mongodb.com/atlas) cluster works) and a free [Cloudinary](https://cloudinary.com) account.

```sh
npm install
```

Open **`.env`** in the project root and fill in the blanks (every variable is explained in the file; `.env.example` is the template):

| Variable | Where to get it |
|---|---|
| `MONGO_URI` | Atlas → Connect → Drivers → connection string |
| `MONGO_DB_NAME` | Any name, created automatically (default `acadverse`) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary Console → Dashboard |
| `JWT_SECRET` | Already generated for you; replace it with your own for production |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The first admin account (password: 8+ characters) |
| `GOOGLE_CLIENT_ID`, `VITE_GOOGLE_CLIENT_ID` | Optional Google sign-in; leave blank to disable |

Then initialise the database and run the app:

```sh
npm run setup        # creates collections and indexes, checks Cloudinary, creates the admin account
npm run dev:server   # API on http://localhost:5000  (health check: /api/health)
npm run dev          # app on http://localhost:5173  (second terminal)
```

`npm run setup` is safe to re-run. Add `-- --reset-password` to overwrite the admin's password with the current `ADMIN_PASSWORD`.

## How accounts are stored

All accounts live in one MongoDB collection, `users`, in the database named by `MONGO_DB_NAME`:

- **Students** register on the sign-in page (email + password, or Google). Passwords are stored as bcrypt hashes, emails are lowercased, and sessions use signed JWTs valid for 7 days.
- **Admins** are the same documents with `role: "admin"`. They sign in on the same page and are taken to `/admin`. The role is checked against the database on every admin request, so demoting someone takes effect immediately.

Uploaded papers, notes and attachments go to Cloudinary (PDF, JPG, PNG, WEBP, max 20 MB). Deleting or replacing a record also deletes the old file. Only admins can upload.

## Admin portal (`/admin`)

| Section | What you can do |
|---|---|
| Overview | Totals, papers per year/type, recent uploads, most-downloaded notes |
| Question Papers | Upload one or many files, search/filter, edit, replace a file, delete (single or bulk) |
| Notes | Upload and manage study notes |
| Users | Search users, promote/demote admins, delete accounts |

## Scripts

| Command | |
|---|---|
| `npm run dev` / `npm run build` / `npm run lint` | Frontend |
| `npm run dev:server` / `npm run server` | API with / without file watching |
| `npm run setup` | Database + Cloudinary + admin initialisation |
| `npm test` | API tests against a throw-away in-memory MongoDB with Cloudinary faked (the first run downloads a MongoDB binary) |

## Project structure

```
api/             Vercel serverless entry (re-exports the Express app)
server/
  src/           app.js (Express app), server.js (local entry), config/, middleware/, models/, routes/, services/, utils/
  scripts/       setup.js
  test/          node:test suites
src/             React app: pages/, components/ (ui, layout, home, admin, effects), contexts/, lib/, data/
public/          Static assets
.env             Your configuration (git-ignored); .env.example is the template
```

## Deployment (Vercel)

`vercel.json` routes `/api/*` to the Express app in `api/index.js` and everything else to the SPA, so one project serves both.
Add the variables from `.env` to the Vercel project (`VITE_*` values are needed at build time). In MongoDB Atlas allow network access from `0.0.0.0/0`, since Vercel has no fixed IPs.
Set `VITE_API_URL` and `ALLOWED_ORIGINS` only if the API is hosted on a different domain from the frontend.

## Conventions

- Import frontend code through the `@/` alias (`@/components/...`).
- `components/ui` is reserved for shadcn primitives; custom visual components go in `components/effects`.
- Never commit `.env`; add new variables to `.env.example`.
