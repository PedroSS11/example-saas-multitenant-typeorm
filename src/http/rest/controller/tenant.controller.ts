import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { ManagementDataSource } from '@src/infra/typeorm/datasource/management.datasource';
import AppLogger from '@src/infra/monitoring/app.logger';
import { TenantService } from '@src/core/services/management/tenant.service';
import { RegisterTenantData } from '../types/tenant.types';

@Controller('api/tenant')
export class TenantController {
  private readonly _managementDatasource: typeof ManagementDataSource;
  private readonly _tenantService: TenantService;

  constructor() {
    this._managementDatasource = ManagementDataSource;
    this._tenantService = new TenantService();
  }

  @Post()
  private async add(req: Request, res: Response): Promise<void> {
    AppLogger.info('Creating tenant');
    const { full_name, cnpj, adress }: RegisterTenantData = req.body;

    if (!full_name) {
      res.status(400).json({ error: 'Tenant ID is required' });
    }

    try {
      // Management Datasource initialization
      await this._managementDatasource.initialize();
      //  Create Tenant
      await this._tenantService.createTenant({
        full_name,
        cnpj,
        adress,
      });

      await this._tenantService.createDatabaseAndTablesForTenant(full_name);

      AppLogger.info(`Database and tables created for tenant ${full_name}`);
      res.status(201).json({
        message: `Database and tables created for tenant ${full_name}`,
      });
    } catch (error) {
      AppLogger.error(`An error ocurred: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
