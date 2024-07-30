const dotenv = require('dotenv');
const {
  Tenant,
} = require('./src/persistence/entities/management/tenant.entity');
const { DataSource } = require('typeorm');
dotenv.config();

const datasource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.MAIN_DATABASE,
  entities: [Tenant],
  synchronize: true,
  migrations: [`database/typeorm/migrations/${process.env.MAIN_DATABASE}/*.ts`],
  cli: {
    migrationsDir: `database/typeorm/migrations/${process.env.MAIN_DATABASE}`,
  },
});

module.exports = { datasource };
