const { execSync } = require('child_process');
import Logger from '@src/infra/monitoring/app.logger';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

async function getDatabaseNames() {
  Logger.info('Initializing migrations application on tenants databases');
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.MAIN_DATABASE,
    port: 3306,
  });

  const [rows, fields]: [mysql.RowDataPacket[], mysql.FieldPacket[]] =
    await connection.query('SELECT full_name FROM tenant');

  await connection.end();

  return rows.map((row: mysql.RowDataPacket) => row.full_name);
}

async function applyMigrations() {
  const dbNames = await getDatabaseNames();

  for (const dbName of dbNames) {
    process.env.DB_NAME = 'company_' + dbName;

    try {
      execSync(
        `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./ormconfig-migration.js`,
        { stdio: 'inherit' },
      );
      Logger.info('Tenants migrations applied succefully');
    } catch (error) {
      Logger.error(
        `Error applying migrations for database ${dbName} - ERROR -> ${error}`,
      );
    }
  }
}

applyMigrations();
