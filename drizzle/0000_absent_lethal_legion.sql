-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "expenses" (
	"id" text PRIMARY KEY NOT NULL,
	"date_time" timestamp NOT NULL,
	"business" text NOT NULL,
	"description" text NOT NULL,
	"price" real NOT NULL,
	"payment_type" text NOT NULL,
	"vat" real NOT NULL,
	"category1" text NOT NULL,
	"category2" text,
	"note1" text,
	"note2" text,
	"photos" text[],
	"created_at" timestamp DEFAULT now()
);

*/