import { serve } from "bun";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Database } from "bun:sqlite";

// SQLite DB setup
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
console.log("SQLite connected");

// Schema definition
const students = sqliteTable("students", {
  id: text("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  dob: text("dob"),
  gender: text("gender")
});

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    dob TEXT,
    gender TEXT
  );
`);

serve({
  port: 3000,
  fetch: async (req) => {
    const url = new URL(req.url);
    console.log(`[${req.method}] ${url.pathname}`);

    if (req.method === "GET" && url.pathname === "/students") {
      const result = await db.select().from(students);
      return Response.json(result);
    }

    if (req.method === "POST" && url.pathname === "/students") {
      const body = await req.json();
      await db.insert(students).values(body);
      return Response.json({ ok: true });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("Listening on http://localhost:3000");
