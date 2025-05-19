import {
    pgTable,
    uuid,
    text,
    timestamp,
    boolean,
    pgEnum,
    index,
  } from "drizzle-orm/pg-core";
  
  
  export const statusEnum = pgEnum("status", ["received", "in_progress", "resolved"]);
  
  
  export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
  
  
  export const users = pgTable(
    "users",
    {
      id: uuid("id").primaryKey().defaultRandom(), 
      kindeId: text("kinde_id").notNull().unique(),
      email: text("email").notNull(),
      name: text("name"),
      role: text("role").notNull().default("citizen"), // citizen and admin
      createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
      kindeIdIdx: index("users_kinde_id_idx").on(table.kindeId),
      emailIdx: index("users_email_idx").on(table.email),
    }),
  );
  
  // Agencies table
  export const agencies = pgTable(
    "agencies",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      name: text("name").notNull(),
      description: text("description"),
      createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
      nameIdx: index("agencies_name_idx").on(table.name),
    }),
  );
  
  // Categories table
  export const categories = pgTable(
    "categories",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      name: text("name").notNull(), // e.g., "Sanitation", "Transportation"
      description: text("description"), // Added for clarity
      agencyId: uuid("agency_id").references(() => agencies.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
      nameIdx: index("categories_name_idx").on(table.name),
      agencyIdIdx: index("categories_agency_id_idx").on(table.agencyId),
    }),
  );
  
  // Complaints table
  export const complaints = pgTable(
    "complaints",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      categoryId: uuid("category_id").notNull().references(() => categories.id, {
        onDelete: "restrict",
      }),
      suggestedCategoryId: uuid("suggested_category_id").references(() => categories.id, {
        onDelete: "set null",
      }), // AI-suggested category
      status: statusEnum("status").notNull().default("received"),
      priority: priorityEnum("priority").default("medium"), // Optional priority
      userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }), // Nullable for anonymous
      isAnonymous: boolean("is_anonymous").notNull().default(false), // Explicit anonymity flag
      agencyId: uuid("agency_id").references(() => agencies.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
      userIdIdx: index("complaints_user_id_idx").on(table.userId),
      categoryIdIdx: index("complaints_category_id_idx").on(table.categoryId),
      suggestedCategoryIdIdx: index("complaints_suggested_category_id_idx").on(table.suggestedCategoryId),
      agencyIdIdx: index("complaints_agency_id_idx").on(table.agencyId),
      statusIdx: index("complaints_status_idx").on(table.status),
      // Optional composite index for admin dashboard filtering
      statusCategoryIdx: index("complaints_status_category_idx").on(table.status, table.categoryId),
    }),
  );
  
  // Responses table
  export const responses = pgTable(
    "responses",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      complaintId: uuid("complaint_id").notNull().references(() => complaints.id, {
        onDelete: "cascade",
      }),
      userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }), // Admin
      message: text("message").notNull(),
      isAIGenerated: boolean("is_ai_generated").notNull().default(false), // Track AI-suggested responses
      createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
      complaintIdIdx: index("responses_complaint_id_idx").on(table.complaintId),
      userIdIdx: index("responses_user_id_idx").on(table.userId),
    }),
  );