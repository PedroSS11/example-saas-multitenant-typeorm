import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Tenant } from '../../../persistence/entities/management/tenant.entity';
dotenv.config();

export const ManagementDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.MAIN_DATABASE,
  entities: [Tenant],
  synchronize: true,
});
