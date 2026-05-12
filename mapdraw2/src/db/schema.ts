import {
  integer,
  pgTable,
  varchar,
  serial,
  pgEnum,
  point,
  json,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  zoom: integer().notNull(),
  location: point("location", { mode: "xy" }).notNull(),
});

export const paths = pgTable("paths", {
  id: serial("id").primaryKey(),
  paths: json(),
  tripId: integer("trip_id")
    .notNull()
    .references(() => trips.id),
});

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  location: point("location", { mode: "xy" }).notNull(),
  text: varchar({ length: 255 }).notNull(),
});
