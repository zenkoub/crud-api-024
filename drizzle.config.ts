import type { Config } from "drizzle-kit";

export default {
  schema: "./src/index.ts",
  out: "./drizzle",
  driver: "bun-sqlite",
  dbCredentials: {
    url: "./sqlite.db"
  }
} satisfies Config;
