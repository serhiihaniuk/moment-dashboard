import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/shared/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
} satisfies Config;
