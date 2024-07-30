const { execSync } = require('child_process');
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.MAIN_DATABASE;

async function applyMigrations() {
  process.env.DB_NAME = DATABASE;

  try {
    execSync(
      `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./ormconfig-migration-management.js`,
      { stdio: 'inherit' },
    );
  } catch (error) {
    console.error(`Error applying migrations for database ${DATABASE}:`, error);
  }
}

applyMigrations();
