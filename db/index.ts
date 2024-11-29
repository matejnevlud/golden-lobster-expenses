import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:hDCBjSUwxcnzpkgFVApjJkyVcWRTKpuF@autorack.proxy.rlwy.net:29914/railway";

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });

export type Expense = typeof schema.expenses.$inferSelect;
export type NewExpense = typeof schema.expenses.$inferInsert;
