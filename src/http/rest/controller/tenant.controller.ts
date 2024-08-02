import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import AppLogger from '../../../infra/monitoring/app.logger';
import { TenantService } from '../../../core/services/management/tenant.service';
import { RegisterTenantData } from '../types/tenant.types';

@Controller('api/tenant')
export class TenantController {
  private readonly _tenantService: TenantService;

  constructor() {
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

  @Get(':name')
  private async getByName(req: Request, res: Response): Promise<void> {
    const tenantName: string = req.params.name;
    AppLogger.info('Getting tenant by name');
    try {
      const tenant = await this._tenantService.getTenantByName(tenantName);
      res.status(200).json(tenant);
    } catch (error) {
      AppLogger.error(`An error ocurred: ${error}`);
      res.status(500).json({ error: error });
    }
  }

  @Get()
  private async getAll(req: Request, res: Response): Promise<void> {
    AppLogger.info('Getting all tenants');
    try {
      const tenants = await this._tenantService.getAllTenants();
      res.status(200).json(tenants);
    } catch (error) {
      AppLogger.error(`An error ocurred: ${error}`);
      res.status(500).json({ error: error });
    }
  }
}
