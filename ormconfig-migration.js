const { User } = require("./src/persistence/entities/user.entity");
const dotenv = require("dotenv");
const path = require("path");
const { DataSource } = require("typeorm");
dotenv.config();

const datasource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "company_waystar",
  entities: [User],
  synchronize: true,
  migrations: [`database/typeorm/migrations/${process.env.DB_NAME}/*.ts`],
  cli: {
    migrationsDir: `database/typeorm/migrations/${process.env.DB_NAME}`,
  },
});

module.exports = { datasource };
