CREATE TABLE IF NOT EXISTS "reservation" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"instagram" text NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"event_id" text DEFAULT 'unknown' NOT NULL,
	"archived" boolean DEFAULT false NOT NULL
);
