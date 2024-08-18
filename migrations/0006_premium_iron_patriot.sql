CREATE TABLE IF NOT EXISTS "partner_request" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"brand_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
