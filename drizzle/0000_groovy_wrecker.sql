CREATE TYPE "public"."priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('received', 'in_progress', 'resolved');--> statement-breakpoint
CREATE TABLE "agencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"agency_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category_id" uuid NOT NULL,
	"suggested_category_id" uuid,
	"status" "status" DEFAULT 'received' NOT NULL,
	"priority" "priority" DEFAULT 'medium',
	"user_id" uuid,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"agency_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"complaint_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"message" text NOT NULL,
	"is_ai_generated" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kinde_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"role" text DEFAULT 'citizen' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_kinde_id_unique" UNIQUE("kinde_id")
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_suggested_category_id_categories_id_fk" FOREIGN KEY ("suggested_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_complaint_id_complaints_id_fk" FOREIGN KEY ("complaint_id") REFERENCES "public"."complaints"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "agencies_name_idx" ON "agencies" USING btree ("name");--> statement-breakpoint
CREATE INDEX "categories_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "categories_agency_id_idx" ON "categories" USING btree ("agency_id");--> statement-breakpoint
CREATE INDEX "complaints_user_id_idx" ON "complaints" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "complaints_category_id_idx" ON "complaints" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "complaints_suggested_category_id_idx" ON "complaints" USING btree ("suggested_category_id");--> statement-breakpoint
CREATE INDEX "complaints_agency_id_idx" ON "complaints" USING btree ("agency_id");--> statement-breakpoint
CREATE INDEX "complaints_status_idx" ON "complaints" USING btree ("status");--> statement-breakpoint
CREATE INDEX "complaints_status_category_idx" ON "complaints" USING btree ("status","category_id");--> statement-breakpoint
CREATE INDEX "responses_complaint_id_idx" ON "responses" USING btree ("complaint_id");--> statement-breakpoint
CREATE INDEX "responses_user_id_idx" ON "responses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_kinde_id_idx" ON "users" USING btree ("kinde_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");