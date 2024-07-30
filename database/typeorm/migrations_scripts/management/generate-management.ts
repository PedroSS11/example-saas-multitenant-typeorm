import Logger from '@src/infra/monitoring/app.logger';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';
import dotenv from 'dotenv';
const { createConnection } = require('typeorm');
import mysql from 'mysql2/promise';
dotenv.config();

const DATABASE = process.env.MAIN_DATABASE;

export async function createMainDatabase(): Promise<void> {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
  });
  // Create a new database
  const newDbName = DATABASE;
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${newDbName}`);
  await connection.end();
  Logger.info('Success creating main database');
}

export const getDatabaseConnectionManagement = async (): Promise<void> => {
  const dbName = DATABASE;

  // Connections variables must be passed on .ENV file !
  // This is just a example
  const connection = await createConnection({
    name: dbName,
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: dbName,
    entities: [Tenant],
    synchronize: false,
  });
  await connection.synchronize();

  Logger.info('ORM connected on main database and entities created');
};

(async () => {
  try {
    await createMainDatabase();
    await getDatabaseConnectionManagement();
    Logger.info('Main database and tables created with successes');
    process.exit(0);
  } catch (error) {
    Logger.error(`Main database creation failed: ${error}`);
    process.exit(1);
  }
})();
