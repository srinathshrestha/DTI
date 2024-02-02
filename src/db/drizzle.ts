import { Pool } from "pg";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";


const projectDir = process.cwd();
loadEnvConfig(projectDir);

 const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: true,
 });


export const db = drizzle(pool);