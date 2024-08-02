import { CreateTenantDTO } from '@src/core/dto/management/tenant.dto';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';

export interface ITenantService {
  createTenant(tenant: CreateTenantDTO): Promise<Tenant>;
}
