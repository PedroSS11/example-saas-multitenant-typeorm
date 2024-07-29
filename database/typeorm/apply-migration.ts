const { execSync } = require('child_process');
const { createConnection } = require('typeorm');
import { User } from '@src/persistence/entities/core/user.entity';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

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

async function applyMigrations() {
  const dbNames = await getDatabaseNames();

  for (const dbName of dbNames) {
    process.env.DB_NAME = 'company_' + dbName;

    try {
      execSync(
        `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./ormconfig-migration.js`,
        { stdio: 'inherit' },
      );
    } catch (error) {
      console.error(`Error applying migrations for database ${dbName}:`, error);
    }
  }
}

applyMigrations();
