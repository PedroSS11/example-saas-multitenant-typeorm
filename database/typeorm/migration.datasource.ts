import { DataSource } from "typeorm";

/**
 * Example of a simple typeorm datasource that provides database connection
 * It is advisable to use environment variables when passing credentials
 * This is just an example of what it would look like
 * 
 * Important!: use synchronize = FALSE if this is your main datasource
 * or it will make ALTER TABLE on the database every time the app initialize, may cause unexpected errors!
 **/

const migrationDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "teste",
  password: "teste",
  database: "saas",
  synchronize: false,
  logging: true,
  entities: ["src/persistence/entities/*.entity.ts"],
  migrations: ["database/typeorm/migrations/*.ts"],
  subscribers: [],
});

export default migrationDataSource;
