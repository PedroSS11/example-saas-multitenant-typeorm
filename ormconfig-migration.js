const { User } = require('./src/persistence/entities/core/user.entity');
const dotenv = require('dotenv');
const { DataSource } = require('typeorm');
dotenv.config();

const datasource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  migrations: [`database/typeorm/migrations/${process.env.DB_NAME}/*.ts`],
  cli: {
    migrationsDir: `database/typeorm/migrations/${process.env.DB_NAME}`,
  },
});

module.exports = { datasource };
