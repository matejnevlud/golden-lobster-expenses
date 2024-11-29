'use server';

// create a new expense uzing drizzle
import {db, NewExpense} from "@/db";
import {expenses} from "@/db/schema";

export async function createExpense(data: NewExpense) {
    return db.insert(expenses).values(data).returning();
}

export async function getExpenses() {
    return db.select().from(expenses);
}