const { execSync } = require("child_process");
const { createConnection } = require("typeorm");
import { User } from "@src/persistence/entities/core/user.entity";
import dotenv from "dotenv";
dotenv.config();

const mainDbConfig = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.MAIN_DATABASE, // Use the main database: "tenants_admin"
};

async function getDatabaseNames() {
  const connection = await createConnection({
    ...mainDbConfig,
    entities: [],
  });

  const result = await connection.query("SELECT * FROM user");
  await connection.close();

  return result.map((row: User) => row.firstName);
}

async function applyMigrations() {
  const dbNames = await getDatabaseNames();

  for (const dbName of dbNames) {
    process.env.DB_NAME = "company_" + dbName;

    try {
      execSync(
        `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./ormconfig-migration.js`,
        { stdio: "inherit" }
      );
    } catch (error) {
      console.error(`Error applying migrations for database ${dbName}:`, error);
    }
  }
}

applyMigrations();
