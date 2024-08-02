import { DefaultTypeOrmRepository } from '../../../infra/typeorm/repository/default-typeorm.repository';
import { Tenant } from '../../entities/management/tenant.entity';
import { DataSource } from 'typeorm';

export class TenantRepository extends DefaultTypeOrmRepository<Tenant> {
  constructor(readonly dataSource: DataSource) {
    super(Tenant, dataSource);
  }
}
