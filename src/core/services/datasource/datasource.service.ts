import { CoreDatasource } from '@src/infra/typeorm/datasource/core.datasource';
import { Connection } from 'typeorm';

export class CoreDatasourceService {
  constructor() {}

  public async createDatabase(tenantName: string) {
    return await CoreDatasource.createDatabase(tenantName);
  }

  public async getDatabaseConnection(connectionName: string) {
    return await CoreDatasource.getDatabaseConnection(connectionName);
  }

  public async connectionSynchronize(connection: Connection) {
    return await CoreDatasource.connectionSynchronize(connection);
  }
}
