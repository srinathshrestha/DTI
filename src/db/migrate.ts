import { db } from "./drizzle";
import { migrate } from "drizzle-orm/node-postgres/migrator";


async function main() {
  console.log("migration started...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration ended...");
}

main().catch((err) => {
  console.log(err);
});
