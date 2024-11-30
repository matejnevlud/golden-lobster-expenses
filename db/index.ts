import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || "postgres://default:mWC7n1ZiDJNV@ep-dark-surf-a2sed0d3.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require";

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });

export type Expense = typeof schema.expenses.$inferSelect;
export type NewExpense = typeof schema.expenses.$inferInsert;
