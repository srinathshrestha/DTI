import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const ModelsTable = pgTable("models", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  description: text("description").notNull(),
  usage: text("usage").notNull(),
  applications: text("applications").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});


import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";



export type models = InferSelectModel<typeof ModelsTable>;
