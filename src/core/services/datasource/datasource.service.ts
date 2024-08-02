import { CoreDatasource } from '../../../infra/typeorm/datasource/core.datasource';
import { Connection } from 'typeorm';

export class CoreDatasourceService {
  constructor() {}

  public async createDatabase(tenantName: string): Promise<void> {
    return await CoreDatasource.createDatabase(tenantName);
  }

  public async getDatabaseConnection(
    connectionName: string,
  ): Promise<Connection> {
    return await CoreDatasource.getDatabaseConnection(connectionName);
  }

  public async connectionSynchronize(connection: Connection): Promise<void> {
    return await CoreDatasource.connectionSynchronize(connection);
  }
}
