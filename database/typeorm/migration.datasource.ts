import { User } from "../../src/persistence/entities/core/user.entity";
import { createConnection, getConnection, Connection } from "typeorm";
import mysql from "mysql2/promise";
// /**
//  * Example of a simple typeorm datasource that provides database connection
//  * It is advisable to use environment variables when passing credentials
//  * This is just an example of what it would look like
//  *
//  * Important!: use synchronize = FALSE if this is your main datasource
//  * or it will make ALTER TABLE on the database every time the app initialize, may cause unexpected errors!
//  **/

const connections: { [key: string]: Connection } = {};

export const createDatabase = async (dbName: string) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
  });

  // Create a new database
  const newDbName = `company_${dbName}`;
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${newDbName}`);
  await connection.end();
};

export const getDatabaseConnection = async (
  tenantId: string
): Promise<Connection> => {
  const dbName = `company_${tenantId}`;

  if (connections[dbName]) {
    return connections[dbName];
  }

  // Connections variables must be passed on .ENV file !
  // This is just a example
  const connection = await createConnection({
    name: dbName,
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: dbName,
    entities: [User],
    synchronize: false,
  });

  connections[dbName] = connection;
  return connection;
};
