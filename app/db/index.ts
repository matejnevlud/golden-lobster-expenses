import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:hDCBjSUwxcnzpkgFVApjJkyVcWRTKpuF@autorack.proxy.rlwy.net:29914/railway",
});

export const db = drizzle(pool, { schema });