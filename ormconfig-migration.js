import { User } from "./src/persistence/entities/core/user.entity";
const dotenv = require("dotenv");
const { DataSource } = require("typeorm");
dotenv.config();

const datasource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  migrations: [`database/typeorm/migrations/${process.env.DB_NAME}/*.ts`],
  cli: {
    migrationsDir: `database/typeorm/migrations/${process.env.DB_NAME}`,
  },
});

module.exports = { datasource };
