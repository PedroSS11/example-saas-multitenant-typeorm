import { User } from "@src/persistence/entities/user.entity";
const { execSync } = require("child_process");
const { createConnection } = require("typeorm");

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
    entities: [],
  });

  const result = await connection.query("SELECT * FROM user");
  await connection.close();

  return result.map((row: User) => row.firstName);
};

const applyMigrations = async () => {
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
};

applyMigrations();
