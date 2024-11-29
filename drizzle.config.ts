import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  dialect: 'postgresql',
  schema: './db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL! || "postgresql://postgres:hDCBjSUwxcnzpkgFVApjJkyVcWRTKpuF@autorack.proxy.rlwy.net:29914/railway",
  },
} satisfies Config;
