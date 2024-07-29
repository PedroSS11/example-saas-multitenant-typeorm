import Logger from "jet-logger";
import dotenv from "dotenv";
import { Tenant } from "../../src/persistence/entities/management/tenant.entity";
import { createConnection, getConnection, Connection } from "typeorm";
import mysql from "mysql2/promise";
dotenv.config();

const DATABASE = process.env.MAIN_DATABASE;

export async function createMainDatabase(): Promise<void> {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
  });
  // Create a new database
  const newDbName = DATABASE;
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${newDbName}`);
  await connection.end();
  Logger.info("Created main database");
}

export const getDatabaseConnection = async (): Promise<void> => {
  const dbName = DATABASE;

  // Connections variables must be passed on .ENV file !
  // This is just a example
  const connection = await createConnection({
    name: dbName,
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: dbName,
    entities: [Tenant],
    synchronize: false,
  });
  await connection.synchronize();
  Logger.info("ORM connected on main database and entities created");
};

(async () => {
  try {
    await createMainDatabase();
    await getDatabaseConnection();
    Logger.info("Main database creation successed");
    process.exit(0);
  } catch (error) {
    Logger.err(`Main database creation failed: ${error}`);
    process.exit(1);
  }
})();
