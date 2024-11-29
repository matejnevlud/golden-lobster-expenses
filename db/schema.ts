import {pgTable, serial, text, timestamp, numeric, boolean, real} from 'drizzle-orm/pg-core';

export const expenses = pgTable("expenses", {
  id: text().primaryKey().notNull(),
  dateTime: timestamp("date_time", { mode: 'string' }).notNull(),
  business: text().notNull(),
  description: text().notNull(),
  price: real().notNull(),
  paymentType: text("payment_type").notNull(),
  vat: real().notNull(),
  category1: text().notNull(),
  category2: text(),
  note1: text(),
  note2: text(),
  photos: text().array(),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});
