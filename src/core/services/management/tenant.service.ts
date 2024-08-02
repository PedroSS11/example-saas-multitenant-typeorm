import { ManagementDataSource } from '@src/infra/typeorm/datasource/management.datasource';
import { TenantRepository } from '@src/persistence/repository/management/tenant.repository';
import { ITenantService } from './interfaces/ITenant-service';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';
import { CreateTenantDTO } from '@src/core/dto/management/tenant.dto';
import { randomUUID } from 'crypto';

export class TenantService implements ITenantService {
  private _managementDatasource: typeof ManagementDataSource;
  private readonly _tenantRepo: TenantRepository;

  constructor() {
    this._managementDatasource = ManagementDataSource;
    this._tenantRepo = new TenantRepository(this._managementDatasource);
  }
  public async createTenant(tenant: CreateTenantDTO): Promise<Tenant> {
    const tenantEntityObject = new Tenant({
      id: randomUUID(),
      full_name: tenant.full_name,
      cnpj: tenant.cnpj,
      adress: tenant.adress,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const tenantEntity = await this._tenantRepo.save(tenantEntityObject);
    return tenantEntity;
  }
}
