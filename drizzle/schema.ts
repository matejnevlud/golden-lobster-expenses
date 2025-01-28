import {pgTable, text, timestamp, real, boolean} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



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
	reported: boolean().default(true),
	photos: text().array(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});
