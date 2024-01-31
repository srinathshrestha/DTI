import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const ModelsTable = pgTable("models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  usage: text("usage").notNull(),
  applications: text("applications").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
