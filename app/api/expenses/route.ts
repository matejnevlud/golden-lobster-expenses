import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { expenses } from '@/app/db/schema';
import { desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        // Fetch all expenses ordered by dateTime descending
        const allExpenses = await db
            .select()
            .from(expenses)
            .orderBy(desc(expenses.dateTime));

        return NextResponse.json(allExpenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch expenses' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Create a new expense record
        const newExpense = {
            id: uuidv4(), // Generate a unique ID
            dateTime: new Date(data.dateTime),
            business: data.business,
            description: data.description,
            price: data.price,
            vat: data.vat,
            paymentType: data.paymentType,
            category1: data.category1,
            category2: data.category2 || null,
            note1: data.note1 || null,
            note2: data.note2 || null,
            photos: data.photos || [],
            createdAt: new Date(),
        };

        // Insert the expense into the database
        const result = await db.insert(expenses).values(newExpense);

        return NextResponse.json(
            { message: 'Expense created successfully', id: newExpense.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating expense:', error);
        return NextResponse.json(
            { error: 'Failed to create expense' },
            { status: 500 }
        );
    }
}
