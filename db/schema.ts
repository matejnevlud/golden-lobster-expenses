import { pgTable, serial, text, timestamp, decimal, varchar } from 'drizzle-orm/pg-core';

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  dateTime: timestamp('date_time').notNull(),
  business: varchar('business', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  paymentType: varchar('payment_type', { length: 50 }).notNull(),
  vat: decimal('vat', { precision: 5, scale: 2 }).notNull(),
  category1: varchar('category1', { length: 100 }).notNull(),
  category2: varchar('category2', { length: 100 }),
  note1: text('note1'),
  note2: text('note2'),
  photos: text('photos').array(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
