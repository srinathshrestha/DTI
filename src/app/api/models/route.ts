import { db } from "@/db/drizzle";
import { ModelsTable } from "@/db/schema/Models";
import { NextResponse } from "next/server";
import { InferSelectModel, eq } from "drizzle-orm";
import { loadEnvConfig } from "@next/env";

export type models = InferSelectModel<typeof ModelsTable>;
import { Redis } from "@upstash/redis";

const projectDir = process.cwd();
loadEnvConfig(projectDir);


const redis = new Redis({
  url: "https://us1-tidy-phoenix-42168.upstash.io",
  token: process.env.REDIS_URL || "",
});
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();
  const cacheKey = id ? `models:${id}` : "models:all";
  let models: any;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("Cache Hit:", cacheKey);
    return NextResponse.json(cachedData);
  } else {
    console.log("Cache Miss:", cacheKey);
  }

  if (id) {
    models = await db.select().from(ModelsTable).where(eq(ModelsTable.id, id));
    if (models.length === 1) {
      await redis.set(cacheKey, JSON.stringify(models[0]));
      // Add expiration for 2 seconds
      await redis.expire(cacheKey, 2);
      return NextResponse.json(models[0]);
    }
  } else {
    models = await db.select().from(ModelsTable);
    await redis.set(cacheKey, JSON.stringify(models));
    // Add expiration for 2 seconds
    await redis.expire(cacheKey, 2);
  }
  return NextResponse.json(models);
}

export async function POST(request: Request) {
  const req = await request.json();
  const model = await db.insert(ModelsTable).values(req).returning();
  return NextResponse.json(model);
}
