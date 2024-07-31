import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { ManagementDataSource } from '@src/infra/typeorm/datasource/management.datasource';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';
import {
  createDatabase,
  getDatabaseConnection,
} from '@src/infra/typeorm/datasource/migration.datasource';
import AppLogger from '@src/infra/monitoring/app.logger';
import { RegisterTenantData } from '@src/core/types/tenant.types';
import { TenantRepository } from '@src/persistence/repository/management/tenant.repository';

@Controller('api/tenant')
export class TenantController {
  private _managementDatasource: typeof ManagementDataSource;
  private _tenantRepo: TenantRepository;
  constructor() {
    this._managementDatasource = ManagementDataSource;
    this._tenantRepo = new TenantRepository(this._managementDatasource);
  }

  @Post()
  private async add(req: Request, res: Response): Promise<void> {
    AppLogger.info('Creating tenant');
    const { tenantId }: RegisterTenantData = req.body;

    if (!tenantId) {
      res.status(400).json({ error: 'Tenant ID is required' });
    }

    try {
      // Management Datasource initialization
      await this._managementDatasource.initialize();
      // Create Tenant
      const newData = new Tenant({
        id: randomUUID(),
        full_name: tenantId,
        cnpj: '123131',
        adress: '31foiaeko',
      });
      await this._tenantRepo.save(newData);
      // MySQL connection + create tenant database and generate tables
      await createDatabase(tenantId);
      const connection = await getDatabaseConnection(tenantId);
      await connection.synchronize();
      AppLogger.info(`Database and tables created for tenant ${tenantId}`);
      res.status(201).json({
        message: `Database and tables created for tenant ${tenantId}`,
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
