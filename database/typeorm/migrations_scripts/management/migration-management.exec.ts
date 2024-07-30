import Logger from 'jet-logger';
import { execSync } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.MAIN_DATABASE;

async function generateMigrations() {
  process.env.DB_NAME = DATABASE;

  // Create a folder for each tenant with their migrations
  const migrationsDir = `database/typeorm/migrations/${DATABASE}`;
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  try {
    execSync(
      `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${migrationsDir}/migration -d ./ormconfig-migration-management.js`,
      { stdio: 'inherit' },
    );
  } catch (error) {
    Logger.err(`Error generating migration for database ${DATABASE}: ${error}`);
  }
}
generateMigrations();
