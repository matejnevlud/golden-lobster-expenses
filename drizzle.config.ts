import type { Config } from 'drizzle-kit';

export default {
  schema: './app/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:hDCBjSUwxcnzpkgFVApjJkyVcWRTKpuF@autorack.proxy.rlwy.net:29914/railway",
  },
  verbose: true,
  strict: true,
} satisfies Config;
