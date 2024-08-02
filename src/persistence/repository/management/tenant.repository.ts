import { DefaultTypeOrmRepository } from '../../../infra/typeorm/repository/default-typeorm.repository';
import { Tenant } from '../../entities/management/tenant.entity';
import { DataSource } from 'typeorm';

export class TenantRepository extends DefaultTypeOrmRepository<Tenant> {
  constructor(readonly dataSource: DataSource) {
    super(Tenant, dataSource);
  }

  public async findByName(tenantName: string): Promise<Tenant | null> {
    return await this.repository.findOne({ where: { full_name: tenantName } });
  }
}
