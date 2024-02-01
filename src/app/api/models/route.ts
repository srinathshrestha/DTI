import { db } from "@/db/drizzle";
import { ModelsTable } from "@/db/schema/Models";
import { NextResponse } from "next/server";
import { InferSelectModel, eq } from "drizzle-orm";

export type models = InferSelectModel<typeof ModelsTable>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();

  let models: any;
  if (id) {
    models = await db.select().from(ModelsTable).where(eq(ModelsTable.id, id));
  } else {
    models = await db.select().from(ModelsTable);
  }
  return NextResponse.json(models);
}

export async function POST(request: Request) {
  const req = await request.json();
  await db.insert(ModelsTable).values(req).returning();
  console.log("req", req);
  const models = await db.select().from(ModelsTable);
  return NextResponse.json(models);
}
