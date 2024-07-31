import { ManagementDataSource } from '@src/infra/typeorm/datasource/management.datasource';
import { TenantRepository } from '@src/persistence/repository/management/tenant.repository';
import { ITenantService } from './interfaces/ITenant-service';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';
import { NotImplementedException } from '@src/core/exceptions/NotImplemented.exception';
import { TenantDTO } from '@src/core/dto/management/tenant.dto';

export class TenantService implements ITenantService {
  private _managementDatasource: typeof ManagementDataSource;
  private readonly _tenantRepo: TenantRepository;

  constructor() {
    this._managementDatasource = ManagementDataSource;
    this._tenantRepo = new TenantRepository(this._managementDatasource);
  }
  createTenant(tenant: TenantDTO): Promise<Tenant> {
    throw new NotImplementedException('Method not implemented.');
  }
}
