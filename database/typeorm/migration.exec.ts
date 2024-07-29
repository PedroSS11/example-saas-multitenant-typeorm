import Logger from "jet-logger";
import { execSync } from "child_process";
import fs from "fs";
import dotenv from "dotenv";
import { Tenant } from "@src/persistence/entities/management/tenant.entity";
const { createConnection } = require("typeorm");
dotenv.config();

const mainDbConfig = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.MAIN_DATABASE, // Use the main database like: "tenants_admin"
};

async function getDatabaseNames() {
  const connection = await createConnection({
    ...mainDbConfig,
    entities: [Tenant],
  });

  const result = await connection.query("SELECT * FROM tenant");
  await connection.close();
  return result.map((row: Tenant) => row?.full_name);
}

async function generateMigrations() {
  const dbNames = await getDatabaseNames();

  for (const dbName of dbNames) {
    process.env.DB_NAME = "company_" + dbName;

    // Create a folder for each tenant with their migrations
    const migrationsDir = `database/typeorm/migrations/company_${dbName}`;
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    try {
      execSync(
        `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${migrationsDir}/migration -d ./ormconfig-migration.js`,
        { stdio: "inherit" }
      );
    } catch (error) {
      Logger.err(`Error generating migration for database ${dbName}: ${error}`);
    }
  }
}
generateMigrations();
