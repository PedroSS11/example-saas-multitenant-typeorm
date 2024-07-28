import { DataSource } from "typeorm";

const migrationDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "teste",
  password: "teste",
  database: "saas",
  synchronize: false,
  logging: true,
  entities: [],
  migrations: ["database/typeorm/migrations/*.ts"],
  subscribers: [],
});

export default migrationDataSource;
