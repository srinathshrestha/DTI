import { ModelsTable } from "@/db/schema/Models";
import { InferSelectModel } from "drizzle-orm";

export type TModel = InferSelectModel<typeof ModelsTable>;


