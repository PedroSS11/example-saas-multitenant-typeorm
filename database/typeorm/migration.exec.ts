import { User } from "../../src/persistence/entities/user.entity";
import Logger from "jet-logger";
const { execSync } = require("child_process");
const { createConnection } = require("typeorm");
import path from "path";
import fs from "fs";

const mainDbConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "company_waystar", // Use the main database like: "tenants_admin"
};

const getDatabaseNames = async () => {
  const connection = await createConnection({
    ...mainDbConfig,
    entities: [User],
  });

  const result = await connection.query("SELECT * FROM user");
  await connection.close();
  return result.map((row: User) => row?.firstName);
};

const generateMigrations = async () => {
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
      console.error(
        `Error generating migration for database ${dbName}:`,
        error
      );
    }
  }
};
generateMigrations();
