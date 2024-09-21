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
  archived: boolean("archived").notNull().default(false),
});

export const reservationTable = pgTable("reservation", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId(15)),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  instagram: text("instagram").notNull(),
  telegram: text("telegram").notNull(),
  processed: boolean("processed").notNull().default(false),
  date: timestamp("date", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  event_id: text("event_id").notNull().default("unknown"),
  archived: boolean("archived").notNull().default(false),
});

export const partnerRequestTable = pgTable("partner_request", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId(15)),
  full_name: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  brand_name: text("brand_name").notNull(),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const concursRegistrationTable = pgTable("concurs_registration", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId(15)),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  instagram: text("instagram").notNull(),
  category: text("category").notNull(),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export type InsertConcursRegistration =
  typeof concursRegistrationTable.$inferInsert;
export type ConcursRegistration = typeof concursRegistrationTable.$inferSelect;

export type InsertPartnerRequest = typeof partnerRequestTable.$inferInsert;
export type PartnerRequest = typeof partnerRequestTable.$inferSelect;

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export type User = Omit<InsertUser, "password">;
export type InsertTicket = typeof ticketTable.$inferInsert;
export type Ticket = typeof ticketTable.$inferSelect;

export type InsertReservation = typeof reservationTable.$inferInsert;
export type Reservation = typeof reservationTable.$inferSelect;
