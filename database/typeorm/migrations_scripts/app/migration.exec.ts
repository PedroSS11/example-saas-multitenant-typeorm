import Logger from 'jet-logger';
import { execSync } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const mainDbConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || null,
  database: process.env.MAIN_DATABASE || 'management',
};

async function getDatabaseNames() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.MAIN_DATABASE,
    port: 3306,
  });

  // Execução da query
  const [rows, fields]: [mysql.RowDataPacket[], mysql.FieldPacket[]] =
    await connection.query('SELECT full_name FROM tenant');

  // Fechamento da conexão
  await connection.end();

  // Mapeamento dos nomes dos bancos de dados
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
    } catch (error) {
      Logger.err(`Error generating migration for database ${dbName}: ${error}`);
    }
  }
}
generateMigrations();
