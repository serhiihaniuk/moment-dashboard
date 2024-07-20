CREATE TABLE IF NOT EXISTS "ticket" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"instagram" text NOT NULL,
	"phone" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL
);
