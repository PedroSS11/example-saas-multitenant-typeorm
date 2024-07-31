import { DefaultTypeOrmRepository } from '@src/infra/typeorm/repository/default-typeorm.repository';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';
import { DataSource, EntityTarget } from 'typeorm';

export class TenantRepository extends DefaultTypeOrmRepository<Tenant> {
  constructor(readonly dataSource: DataSource) {
    super(Tenant, dataSource);
  }
}
