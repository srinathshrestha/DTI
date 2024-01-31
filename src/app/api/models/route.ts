import { db } from "@/db/drizzle";
import { ModelsTable } from "@/db/schema/Models";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const models = await db.select().from(ModelsTable);
  return NextResponse.json(models);
}

export async function POST(request: Request) {
  const req = await request.json();
  await db.insert(ModelsTable).values(req).returning();
  console.log("req",req);
  const models = await db.select().from(ModelsTable);
  return NextResponse.json(models);
}
