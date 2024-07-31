import { Tenant } from '@src/persistence/entities/management/tenant.entity';

export interface ITenantService {
  createTenant(tenant: Tenant): Promise<Tenant>;
}
