import { ManagementDataSource } from '../../../infra/typeorm/datasource/management.datasource';
import { TenantRepository } from '../../../persistence/repository/management/tenant.repository';
import { ITenantService } from './interfaces/ITenant-service';
import { Tenant } from '../../../persistence/entities/management/tenant.entity';
import { CreateTenantDTO } from '../../dto/management/tenant.dto';
import { randomUUID } from 'crypto';
import { CoreDatasourceService } from '../datasource/datasource.service';

export class TenantService implements ITenantService {
  private readonly _managementDatasource: typeof ManagementDataSource;
  private readonly _tenantRepo: TenantRepository;
  private readonly _coreDatasourceService: CoreDatasourceService;

  constructor() {
    this._managementDatasource = ManagementDataSource;
    this._tenantRepo = new TenantRepository(this._managementDatasource);
    this._managementDatasource.initialize();
    this._coreDatasourceService = new CoreDatasourceService();
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

  public async createDatabaseAndTablesForTenant(
    tenantName: string,
  ): Promise<void> {
    await this._coreDatasourceService.createDatabase(tenantName);
    const connection =
      await this._coreDatasourceService.getDatabaseConnection(tenantName);
    await this._coreDatasourceService.connectionSynchronize(connection);
  }

  public async getTenantById(tenantUUID: string): Promise<Tenant | null> {
    return this._tenantRepo.findOneById(tenantUUID);
  }

  public async getTenantByName(tenantName: string): Promise<Tenant | null> {
    return await this._tenantRepo.findByName(tenantName);
  }

  public async getAllTenants(): Promise<Tenant[] | []> {
    return this._tenantRepo.findAll();
  }
}
