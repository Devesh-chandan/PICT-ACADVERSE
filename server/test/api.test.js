import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

// Configure the environment BEFORE the app is imported. An empty MONGO_URI makes
// every DB connection attempt fail immediately, so these tests never touch a real
// database (dotenv does not override variables that are already defined).
process.env.JWT_SECRET = "test-secret";
process.env.MONGO_URI = "";
process.env.CLOUDINARY_CLOUD_NAME = "test";

const { default: app } = await import("../src/app.js");
const { default: User } = await import("../src/models/user.js");
const { getJwtSecret, getMissingConfig } = await import("../src/config/env.js");

let server;
let base;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

const json = (path, body, headers = {}) =>
  fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

const validToken = () => jwt.sign({ id: "user1", email: "a@b.co", role: "student" }, "test-secret");

test("health check responds without needing the database", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, "ok");
});

test("unknown routes return a JSON 404", async () => {
  const res = await fetch(`${base}/api/nope`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "Not found" });
});

test("CORS allows the app origins and rejects look-alike origins", async () => {
  const acao = async (origin) =>
    (await fetch(`${base}/api/health`, { headers: { Origin: origin } })).headers.get("access-control-allow-origin");

  assert.equal(await acao("http://localhost:5173"), "http://localhost:5173");
  assert.equal(await acao("https://my-preview.vercel.app"), "https://my-preview.vercel.app");
  assert.equal(await acao("https://evil.com"), null);
  assert.equal(await acao("https://vercel.app.evil.com"), null);
  assert.equal(await acao("http://something.vercel.app"), null); // must be https
});

test("register rejects malformed input before touching the database", async () => {
  const cases = [
    {},
    { name: "A", email: "a@b.co" },
    { name: "A", email: "not-an-email", password: "secret1" },
    { name: "A", email: "a@b.co", password: "123" },
    { name: "A", email: { $ne: null }, password: "secret1" },
    { name: "A", email: "a@b.co", password: "x".repeat(100) },
  ];
  for (const body of cases) {
    const res = await json("/api/auth/register", body);
    assert.equal(res.status, 400, JSON.stringify(body));
  }
});

test("login rejects malformed input and NoSQL operator payloads", async () => {
  for (const body of [{}, { email: "a@b.co" }, { email: { $ne: null }, password: "x" }, { email: "a@b.co", password: { $ne: "" } }]) {
    const res = await json("/api/auth/login", body);
    assert.equal(res.status, 400, JSON.stringify(body));
  }
});

test("google login requires a token", async () => {
  assert.equal((await json("/api/auth/google", {})).status, 400);
});

test("valid auth requests return 503 (not a hang or a crash) when the database is down", async () => {
  const res = await json("/api/auth/login", { email: "a@b.co", password: "secret1" });
  assert.equal(res.status, 503);
});

test("invalid JSON body is a 400", async () => {
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not json",
  });
  assert.equal(res.status, 400);
});

test("admin API rejects missing, malformed and forged tokens", async () => {
  const forged = jwt.sign({ id: "attacker", role: "admin" }, "your_jwt_secret_key");
  for (const headers of [{}, { Authorization: "Bearer garbage" }, { Authorization: `Bearer ${forged}` }]) {
    const res = await fetch(`${base}/api/admin/stats`, { headers });
    assert.equal(res.status, 401, JSON.stringify(headers));
  }
});

test("students can no longer upload through the public PYQ route", async () => {
  const form = new FormData();
  form.append("file", new Blob(["%PDF-1.4"], { type: "application/pdf" }), "paper.pdf");
  const res = await fetch(`${base}/api/pyqs`, {
    method: "POST",
    headers: { Authorization: `Bearer ${validToken()}` },
    body: form,
  });
  assert.equal(res.status, 404);
});

test("User JSON never exposes the password hash", () => {
  const user = new User({ name: "A", email: "a@b.co", password: "$2a$10$hash" });
  const out = user.toJSON();
  assert.equal(out.password, undefined);
  assert.equal(out.email, "a@b.co");
});

test("a missing JWT_SECRET fails loudly instead of using a default", () => {
  const saved = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;
  try {
    assert.throws(() => getJwtSecret(), /JWT_SECRET/);
  } finally {
    process.env.JWT_SECRET = saved;
  }
});

test("getMissingConfig reports blank required variables", () => {
  const saved = process.env.CLOUDINARY_API_KEY;
  process.env.CLOUDINARY_API_KEY = "  ";
  try {
    assert.ok(getMissingConfig().includes("CLOUDINARY_API_KEY"));
    assert.ok(!getMissingConfig().includes("JWT_SECRET"));
  } finally {
    if (saved === undefined) delete process.env.CLOUDINARY_API_KEY;
    else process.env.CLOUDINARY_API_KEY = saved;
  }
});
