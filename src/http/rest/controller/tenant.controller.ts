import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { ManagementDataSource } from '@src/infra/typeorm/datasource/management.datasource';
import {
  createDatabase,
  getDatabaseConnection,
} from '@src/infra/typeorm/datasource/migration.datasource';
import AppLogger from '@src/infra/monitoring/app.logger';
import { RegisterTenantData } from '@src/core/types/tenant.types';
import { TenantService } from '@src/core/services/management/tenant.service';

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
      // Create Tenant
      await this._tenantService.createTenant({
        full_name,
        cnpj,
        adress,
      });

      // ----

      // MySQL connection + create tenant database and generate tables
      await createDatabase(full_name);
      const connection = await getDatabaseConnection(full_name);
      await connection.synchronize();
      AppLogger.info(`Database and tables created for tenant ${full_name}`);
      res.status(201).json({
        message: `Database and tables created for tenant ${full_name}`,
      });
    } catch (error) {
      AppLogger.error(`An error ocurred: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  private async testEndpoint(req: Request, res: Response): Promise<void> {
    AppLogger.info('Test endpoint was called');
    try {
      res.status(200).json({ message: 'SUCESSO' });
    } catch (error) {
      res.status(500).json({ error });
      AppLogger.error(`An error occurred: ${error}`);
    }
  }
}
