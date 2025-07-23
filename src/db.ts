import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { students } from '../drizzle/schema';

const sqlite = new Database('dev.sqlite');
export const db = drizzle(sqlite, { schema: { students } });
