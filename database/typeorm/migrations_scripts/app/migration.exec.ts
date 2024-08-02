import Logger from '../../../../src/infra/monitoring/app.logger';
import { execSync } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

async function getDatabaseNames() {
  Logger.info(
    'Initializing migrations SQL files generation on tenants databases',
  );
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

async function generateMigrations() {
  const dbNames = await getDatabaseNames();

  for (const dbName of dbNames) {
    process.env.DB_NAME = 'company_' + dbName;

    // Create a folder for each tenant with their migrations
    const migrationsDir = `database/typeorm/migrations/company_${dbName}`;
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    try {
      execSync(
        `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${migrationsDir}/migration -d ./ormconfig-migration.js`,
        { stdio: 'inherit' },
      );
      Logger.info('Tenants migrations SQL files generated succefully');
    } catch (error) {
      Logger.error(
        `Error generating migration SQL files for database ${dbName} - ERROR -> ${error}`,
      );
    }
  }
}
generateMigrations();
