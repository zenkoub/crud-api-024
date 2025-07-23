import { drizzle } from 'drizzle-orm/bun-sqlite';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { Database } from 'bun:sqlite';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const students = sqliteTable('students', {
  id: text('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  dob: text('dob'),
  gender: text('gender'),
});

const API_KEY = process.env.API_KEY;

export default async function handler(req: Request) {
  const key = req.headers.get("x-api-key");

  if (key !== API_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export default async function handler(req: Request) {
  const url = new URL(req.url);

  if (req.method === 'GET') {
    const result = await db.select().from(students);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (req.method === 'POST') {
    const body = await req.json();
    await db.insert(students).values(body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not found', { status: 404 });
}
