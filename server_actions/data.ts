'use server';

// create a new expense uzing drizzle
import {db, NewExpense} from "@/db";
import {expenses} from "@/db/schema";

export async function createExpense(data: NewExpense) {
    try {
        return db.insert(expenses).values(data).returning();
    } catch (error) {
        console.error('Error creating expense:', error);
        throw new Error(`Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getExpenses() {
    return db.select().from(expenses);
}