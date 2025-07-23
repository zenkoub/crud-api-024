import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: { url: './dev.sqlite' }
});
