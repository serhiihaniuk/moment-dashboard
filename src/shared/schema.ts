import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { generateId } from "lucia";

export const userTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId(15)),
  password: text("password").notNull(),
  username: text("username").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const ticketTable = pgTable("ticket", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  instagram: text("instagram").notNull(),
  phone: text("phone").notNull(),
  qr_code: text("qr_code").notNull(),
  arrived: boolean("arrived").notNull().default(false),
  grade: text("grade").notNull().default("unknown"),
  date: timestamp("date", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  event_id: text("event_id").notNull().default("unknown"),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export type User = Omit<InsertUser, "password">;
export type InsertTicket = typeof ticketTable.$inferInsert;
export type Ticket = typeof ticketTable.$inferSelect;
