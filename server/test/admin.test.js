import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";

// End-to-end tests of the admin API against a real (in-memory) MongoDB.
// Cloudinary is replaced by a fake so nothing leaves the machine.
const mongod = await MongoMemoryServer.create();
process.env.JWT_SECRET = "test-secret";
process.env.MONGO_URI = mongod.getUri("acadverse_test");

const { default: app } = await import("../src/app.js");
const { default: mongoose } = await import("mongoose");
const { default: User } = await import("../src/models/user.js");
const { default: Pyq } = await import("../src/models/Pyq.js");
const { storage, parseCloudinaryUrl, assetRef } = await import("../src/services/storage.js");

// ---- fake storage ----------------------------------------------------------
let uploadCounter = 0;
const destroyed = [];
let failUploadsFor = null; // file name whose upload should fail

storage.upload = async (buffer, { filename }) => {
  if (failUploadsFor && filename === failUploadsFor) throw new Error("boom");
  uploadCounter += 1;
  return {
    url: `https://res.cloudinary.com/test/image/upload/v1/fake/${uploadCounter}-${filename}`,
    publicId: `fake/${uploadCounter}-${filename.replace(/\.[^/.]+$/, "")}`,
    resourceType: "image",
  };
};
storage.destroy = async (ref) => {
  if (ref) destroyed.push(ref.publicId);
  return true;
};

// ---- server + helpers ------------------------------------------------------
let server;
let base;
let admin;
let student;
let adminToken;
let studentToken;

const sign = (user) => jwt.sign({ id: user.id, email: user.email, role: user.role }, "test-secret");

before(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}`;

  admin = await User.create({ name: "Ada Admin", email: "admin@test.dev", password: "x", role: "admin" });
  student = await User.create({ name: "Sam Student", email: "sam@test.dev", password: "x" });
  adminToken = sign(admin);
  studentToken = sign(student);
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await mongoose.disconnect();
  await mongod.stop();
});

const call = (path, { method = "GET", token = adminToken, json, form } = {}) =>
  fetch(base + path, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(json ? { "Content-Type": "application/json" } : {}),
    },
    body: json ? JSON.stringify(json) : form,
  });

const file = (name, type = "application/pdf", size = 8) =>
  Object.assign(new Blob([new Uint8Array(size)], { type }), { name });

const formOf = (fields = {}, files = [], fileField = "files") => {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined) continue;
    for (const item of [].concat(v)) form.append(k, item);
  }
  for (const f of files) form.append(fileField, f, f.name);
  return form;
};

const paperFields = { subject: "Data Structures (DS)", year: "2", paperType: "End-Sem" };

// ---- access control --------------------------------------------------------
test("admin routes: 401 without token, 403 for students, 200 for admins", async () => {
  assert.equal((await call("/api/admin/stats", { token: null })).status, 401);
  const forbidden = await call("/api/admin/stats", { token: studentToken });
  assert.equal(forbidden.status, 403);
  assert.equal((await call("/api/admin/stats")).status, 200);
});

test("a token for a deleted account is rejected", async () => {
  const ghost = await User.create({ name: "Ghost", email: "ghost@test.dev", password: "x", role: "admin" });
  const token = sign(ghost);
  await ghost.deleteOne();
  assert.equal((await call("/api/admin/stats", { token })).status, 401);
});

test("/api/auth/me returns the fresh role, so promotions apply without re-login", async () => {
  const promoted = await User.create({ name: "Pat", email: "pat@test.dev", password: "x" });
  const staleToken = sign(promoted); // issued while still a student
  assert.equal((await call("/api/admin/stats", { token: staleToken })).status, 403);

  promoted.role = "admin";
  await promoted.save();

  assert.equal((await call("/api/admin/stats", { token: staleToken })).status, 200);
  const me = await (await call("/api/auth/me", { token: staleToken })).json();
  assert.equal(me.user.role, "admin");
  assert.equal(me.user.password, undefined);
});

// ---- auth against a real database -----------------------------------------
test("register -> duplicate -> login -> wrong password", async () => {
  const body = { name: "New User", email: "new@test.dev", password: "secret123" };
  const reg = await call("/api/auth/register", { method: "POST", token: null, json: body });
  assert.equal(reg.status, 201);
  const regJson = await reg.json();
  assert.ok(regJson.token);
  assert.equal(regJson.user.password, undefined);
  assert.equal(regJson.user.role, "student");

  assert.equal((await call("/api/auth/register", { method: "POST", token: null, json: body })).status, 400);

  const ok = await call("/api/auth/login", { method: "POST", token: null, json: { email: body.email, password: body.password } });
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).user.password, undefined);

  const bad = await call("/api/auth/login", { method: "POST", token: null, json: { email: body.email, password: "nope-nope" } });
  assert.equal(bad.status, 401);
  const missing = await call("/api/auth/login", { method: "POST", token: null, json: { email: "x@test.dev", password: "nope-nope" } });
  assert.equal(missing.status, 401);
});

test("emails are case-insensitive for registration and login", async () => {
  const reg = await call("/api/auth/register", {
    method: "POST", token: null, json: { name: "Case Test", email: "  Case.Test@Test.dev ", password: "secret123" },
  });
  assert.equal(reg.status, 201);
  assert.equal((await reg.json()).user.email, "case.test@test.dev");

  const login = await call("/api/auth/login", {
    method: "POST", token: null, json: { email: "CASE.TEST@test.dev", password: "secret123" },
  });
  assert.equal(login.status, 200);
  const dup = await call("/api/auth/register", {
    method: "POST", token: null, json: { name: "Case Test", email: "case.test@TEST.dev", password: "secret123" },
  });
  assert.equal(dup.status, 400);
});

// ---- papers ---------------------------------------------------------------
test("papers: validation and file rules", async () => {
  const post = (fields, files) => call("/api/admin/papers", { method: "POST", form: formOf(fields, files) });

  assert.equal((await post(paperFields, [])).status, 400, "no file");
  assert.equal((await post({ ...paperFields, year: "9" }, [file("a.pdf")])).status, 400, "bad year");
  assert.equal((await post({ year: "1", paperType: "In-Sem" }, [file("a.pdf")])).status, 400, "no subject");
  assert.equal((await post(paperFields, [file("a.exe", "application/x-msdownload")])).status, 400, "bad type");
  assert.equal((await post(paperFields, [file("big.pdf", "application/pdf", 21 * 1024 * 1024)])).status, 413, "too big");
  assert.equal(await Pyq.countDocuments(), 0, "nothing was stored");
});

test("papers: upload several, list, filter, search, paginate, public listing", async () => {
  const res = await call("/api/admin/papers", {
    method: "POST",
    form: formOf(paperFields, [file("DS In-Sem 2024.pdf"), file("DS End-Sem 2023.pdf")]),
  });
  assert.equal(res.status, 201);
  const { created, failed } = await res.json();
  assert.equal(created.length, 2);
  assert.equal(failed.length, 0);
  assert.equal(created[0].title, "DS In-Sem 2024");
  assert.equal(created[0].uploadedBy, admin.id);
  assert.ok(created[0].publicId);

  await call("/api/admin/papers", {
    method: "POST",
    form: formOf({ subject: "Quantum Physics (QP)", year: "1", paperType: "In-Sem", title: "QP Midterm" }, [file("scan.pdf")]),
  });

  const list = await (await call("/api/admin/papers?limit=2&page=1")).json();
  assert.equal(list.total, 3);
  assert.equal(list.items.length, 2);
  assert.equal(list.pages, 2);

  assert.equal((await (await call("/api/admin/papers?year=1")).json()).total, 1);
  assert.equal((await (await call("/api/admin/papers?search=end-sem")).json()).total, 1);
  assert.equal((await (await call("/api/admin/papers?search=qp%20midterm")).json()).items[0].title, "QP Midterm");
  // regex metacharacters in search must not blow up
  assert.equal((await call("/api/admin/papers?search=(")).status, 200);

  const pub = await (await call("/api/pyqs", { token: null })).json();
  assert.equal(pub.length, 3);
});

test("papers: a failing upload is reported and the rest still succeed", async () => {
  failUploadsFor = "bad.pdf";
  try {
    const res = await call("/api/admin/papers", {
      method: "POST",
      form: formOf({ subject: "Chem", year: "1", paperType: "End-Sem" }, [file("good.pdf"), file("bad.pdf")]),
    });
    assert.equal(res.status, 201);
    const { created, failed } = await res.json();
    assert.deepEqual(created.map((p) => p.title), ["good"]);
    assert.deepEqual(failed.map((f) => f.file), ["bad.pdf"]);
  } finally {
    failUploadsFor = null;
  }
});

test("papers: edit metadata, replace file (old asset removed), delete (asset removed)", async () => {
  const created = (await (await call("/api/admin/papers", {
    method: "POST",
    form: formOf({ subject: "Edit Me", year: "3", paperType: "In-Sem" }, [file("edit.pdf")]),
  })).json()).created[0];

  assert.equal((await call(`/api/admin/papers/${created._id}`, { method: "PATCH", json: { year: "7" } })).status, 400);
  assert.equal((await call(`/api/admin/papers/${created._id}`, { method: "PATCH", json: { title: "  " } })).status, 400);
  assert.equal((await call("/api/admin/papers/not-an-id", { method: "PATCH", json: { year: "1" } })).status, 400);
  assert.equal((await call("/api/admin/papers/64b64b64b64b64b64b64b64b", { method: "PATCH", json: { year: "1" } })).status, 404);

  const edited = await (await call(`/api/admin/papers/${created._id}`, {
    method: "PATCH",
    json: { title: "Edited Title", year: "4", paperType: "End-Sem" },
  })).json();
  assert.equal(edited.title, "Edited Title");
  assert.equal(edited.year, "4");
  assert.equal(edited.fileUrl, created.fileUrl, "file untouched by a metadata edit");

  const replaced = await (await call(`/api/admin/papers/${created._id}`, {
    method: "PATCH",
    form: formOf({}, [file("new-version.pdf")], "file"),
  })).json();
  assert.notEqual(replaced.fileUrl, created.fileUrl);
  assert.ok(destroyed.includes(created.publicId), "old asset was removed after replacing");

  const del = await call(`/api/admin/papers/${created._id}`, { method: "DELETE" });
  assert.equal(del.status, 200);
  assert.ok(destroyed.includes(replaced.publicId), "asset removed on delete");
  assert.equal((await call(`/api/admin/papers/${created._id}`, { method: "DELETE" })).status, 404);
});

test("papers: legacy documents without publicId are cleaned up via their URL", async () => {
  const legacy = await Pyq.create({
    subject: "Legacy", year: "1", paperType: "In-Sem", title: "Old upload",
    fileUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/acadverse_pyqs/old_paper.pdf",
  });
  await call(`/api/admin/papers/${legacy.id}`, { method: "DELETE" });
  assert.ok(destroyed.includes("acadverse_pyqs/old_paper"));
});

test("papers: bulk delete", async () => {
  const a = await Pyq.create({ subject: "B", year: "1", paperType: "In-Sem", title: "a", fileUrl: "https://x/a.pdf", publicId: "bulk/a" });
  const b = await Pyq.create({ subject: "B", year: "1", paperType: "In-Sem", title: "b", fileUrl: "https://x/b.pdf", publicId: "bulk/b" });

  assert.equal((await call("/api/admin/papers/bulk-delete", { method: "POST", json: { ids: [] } })).status, 400);
  assert.equal((await call("/api/admin/papers/bulk-delete", { method: "POST", json: { ids: ["nope"] } })).status, 400);

  const res = await call("/api/admin/papers/bulk-delete", { method: "POST", json: { ids: [a.id, b.id] } });
  assert.equal((await res.json()).deleted, 2);
  assert.ok(destroyed.includes("bulk/a") && destroyed.includes("bulk/b"));
});

// ---- notes ----------------------------------------------------------------
test("notes: full lifecycle including the public listing and download counter", async () => {
  const fields = { title: "DBMS Notes", subject: "DBMS", author: "Priya", description: "ER, SQL", pages: "85" };
  const post = (f, files = [file("dbms.pdf")]) => call("/api/admin/notes", { method: "POST", form: formOf(f, files, "file") });

  assert.equal((await post({ ...fields, title: "" })).status, 400);
  assert.equal((await post({ ...fields, pages: "-4" })).status, 400);
  assert.equal((await post({ ...fields, author: undefined })).status, 400);
  assert.equal((await post(fields, [])).status, 400);

  const res = await post(fields);
  assert.equal(res.status, 201);
  const note = await res.json();
  assert.equal(note.pages, 85);
  assert.equal(note.downloads, 0);

  const listed = await (await call("/api/admin/notes?search=priya")).json();
  assert.equal(listed.total, 1);

  const pub = await (await call("/api/notes", { token: null })).json();
  assert.equal(pub.length, 1);

  const dl = await (await call(`/api/notes/${note._id}/download`, { method: "POST", token: null })).json();
  assert.equal(dl.downloads, 1);
  assert.equal(dl.fileUrl, note.fileUrl);
  assert.equal((await call("/api/notes/not-an-id/download", { method: "POST", token: null })).status, 400);

  const patched = await (await call(`/api/admin/notes/${note._id}`, { method: "PATCH", json: { title: "DBMS v2", pages: 90 } })).json();
  assert.equal(patched.title, "DBMS v2");
  assert.equal(patched.pages, 90);

  assert.equal((await call(`/api/admin/notes/${note._id}`, { method: "DELETE" })).status, 200);
  assert.ok(destroyed.includes(note.publicId));
  assert.equal((await (await call("/api/notes", { token: null })).json()).length, 0);
});

// ---- users ----------------------------------------------------------------
test("users: list, promote, demote rules, delete rules", async () => {
  const list = await (await call("/api/admin/users?search=sam")).json();
  assert.equal(list.total, 1);
  assert.equal(list.items[0].password, undefined);
  assert.equal((await (await call("/api/admin/users?role=admin")).json()).items.every((u) => u.role === "admin"), true);

  const promoted = await call(`/api/admin/users/${student.id}`, { method: "PATCH", json: { role: "admin" } });
  assert.equal((await promoted.json()).role, "admin");
  // the (still student-signed) token now works as admin
  assert.equal((await call("/api/admin/stats", { token: studentToken })).status, 200);

  assert.equal((await call(`/api/admin/users/${student.id}`, { method: "PATCH", json: { role: "superuser" } })).status, 400);
  assert.equal((await call(`/api/admin/users/${admin.id}`, { method: "PATCH", json: { role: "student" } })).status, 400, "cannot demote self");
  assert.equal((await call(`/api/admin/users/${admin.id}`, { method: "DELETE" })).status, 400, "cannot delete self");

  const demoted = await call(`/api/admin/users/${student.id}`, { method: "PATCH", json: { role: "student" } });
  assert.equal((await demoted.json()).role, "student");
  assert.equal((await call("/api/admin/stats", { token: studentToken })).status, 403, "demotion is immediate");

  // when only one admin remains, even another request cannot remove them
  const solo = await User.create({ name: "Temp", email: "temp@test.dev", password: "x" });
  assert.equal((await call(`/api/admin/users/${solo.id}`, { method: "DELETE" })).status, 200);
  assert.equal((await call(`/api/admin/users/${solo.id}`, { method: "DELETE" })).status, 404);
});

// ---- stats ----------------------------------------------------------------
test("stats reflect the data", async () => {
  const stats = await (await call("/api/admin/stats")).json();
  assert.equal(stats.totals.papers, await Pyq.countDocuments());
  assert.equal(stats.totals.admins, await User.countDocuments({ role: "admin" }));
  assert.ok(Array.isArray(stats.papersByYear));
  assert.ok(Array.isArray(stats.recent.papers));
});

// ---- storage helpers -------------------------------------------------------
test("parseCloudinaryUrl understands image, pdf, raw and transformed URLs", () => {
  assert.deepEqual(
    parseCloudinaryUrl("https://res.cloudinary.com/demo/image/upload/v1700000000/acadverse_pyqs/old_paper.pdf"),
    { publicId: "acadverse_pyqs/old_paper", resourceType: "image" }
  );
  assert.deepEqual(
    parseCloudinaryUrl("https://res.cloudinary.com/demo/raw/upload/v1/acadverse_pyqs/notes.docx"),
    { publicId: "acadverse_pyqs/notes.docx", resourceType: "raw" }
  );
  assert.deepEqual(
    parseCloudinaryUrl("https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v12/a/b.png?x=1"),
    { publicId: "a/b", resourceType: "image" }
  );
  assert.equal(parseCloudinaryUrl("https://example.com/file.pdf"), null);
  assert.equal(parseCloudinaryUrl(undefined), null);
  assert.deepEqual(assetRef({ publicId: "p", resourceType: "raw" }), { publicId: "p", resourceType: "raw" });
});
