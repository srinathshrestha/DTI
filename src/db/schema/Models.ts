import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ModelsTable = pgTable("models", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  name: varchar("name").notNull(),
  logo: text("logo").notNull(),
  link: text("link").notNull(),
  description: varchar("description").notNull(),
  usage: text("usage").notNull(),
  applications: text("applications").notNull(),
  featured: boolean("featured"),
  tag: text("tag"),
});
