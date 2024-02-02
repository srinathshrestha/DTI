import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const ModelsTable = pgTable("models", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  name: varchar("name", { length: 20 }).notNull(),
  logo: text("logo").notNull(),
  link: text("link").notNull(),
  description: varchar("description", { length: 400 }).notNull(),
  usage: text("usage").notNull(),
  applications: text("applications").notNull(),
  featured: boolean("featured")
  
});

export type TModel = InferSelectModel<typeof ModelsTable>;
