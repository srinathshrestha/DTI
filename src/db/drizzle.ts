import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { loadEnvConfig } from "@next/env";


 const projectDir = process.cwd();
 loadEnvConfig(projectDir);

 const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
  //  ssl: true,
 });


export const db = drizzle(pool);