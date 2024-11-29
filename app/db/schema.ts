// src/db/schema.ts
import { integer, real, text, timestamp } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const expenses = pgTable('expenses', {
    id: text('id').primaryKey(),
    dateTime: timestamp('date_time').notNull(),
    business: text('business').notNull(),
    description: text('description').notNull(),
    price: real('price').notNull(),
    paymentType: text('payment_type').notNull(),
    vat: real('vat').notNull(),
    category1: text('category1').notNull(),
    category2: text('category2'),
    note1: text('note1'),
    note2: text('note2'),
    photos: text('photos').array(),
    createdAt: timestamp('created_at').defaultNow(),
});
