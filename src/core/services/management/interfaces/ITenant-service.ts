import { CreateTenantDTO } from '../../../dto/management/tenant.dto';
import { Tenant } from '../../../../persistence/entities/management/tenant.entity';

export interface ITenantService {
  createTenant(tenant: CreateTenantDTO): Promise<Tenant>;
  createDatabaseAndTablesForTenant(tenantName: string): Promise<void>;
  getTenantById(tenantUUID: string): Promise<Tenant | null>;
  getTenantByName(tenantName: string): Promise<Tenant | null>;
}
