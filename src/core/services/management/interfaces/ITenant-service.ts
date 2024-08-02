import { CreateTenantDTO } from '../../../dto/management/tenant.dto';
import { Tenant } from '../../../../persistence/entities/management/tenant.entity';

export interface ITenantService {
  createTenant(tenant: CreateTenantDTO): Promise<Tenant>;
}
