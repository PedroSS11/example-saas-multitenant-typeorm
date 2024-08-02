import { createConnection, Connection } from 'typeorm';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { User } from '@src/persistence/entities/core/user.entity';
dotenv.config();

const connections: { [key: string]: Connection } = {};

export class CoreDatasource {
  static async createDatabase(dbName: string) {
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: 3306,
    });

    const newDbName = `company_${dbName}`;
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${newDbName}`);
    await connection.end();
  }

  static async getDatabaseConnection(tenantId: string): Promise<Connection> {
    const dbName = `company_${tenantId}`;

    if (connections[dbName]) {
      return connections[dbName];
    }

    const connection = await createConnection({
      name: dbName,
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: dbName,
      entities: [User],
      synchronize: false,
    });

    connections[dbName] = connection;
    return connection;
  }

  static async connectionSynchronize(connection: Connection): Promise<void> {
    return await connection.synchronize();
  }

  static async closeAllConnections() {
    for (const dbName in connections) {
      await connections[dbName].close();
      delete connections[dbName];
    }
  }
}

// Close all connections when the application shuts down
process.on('SIGINT', async () => {
  await CoreDatasource.closeAllConnections();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await CoreDatasource.closeAllConnections();
  process.exit(0);
});
