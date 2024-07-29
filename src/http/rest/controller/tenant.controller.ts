import { Controller, Post } from '@overnightjs/core';
import Logger from 'jet-logger';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { ManagementDataSource } from '@src/infra/typeorm/datasource/management.datasource';
import { Tenant } from '@src/persistence/entities/management/tenant.entity';
import {
  createDatabase,
  getDatabaseConnection,
} from '@src/infra/typeorm/datasource/migration.datasource';

@Controller('api/tenant')
export class UserController {
  @Post()
  private async add(req: Request, res: Response) {
    Logger.info('Creating tenant');
    const { tenantId } = req.body;

    if (!tenantId) {
      return res.status(400).json({ error: 'Tenant ID is required' });
    }

    try {
      const managementConnection = await ManagementDataSource.initialize();
      const repo = await managementConnection.getRepository(Tenant);
      const newData = new Tenant({ id: randomUUID(), full_name: 'pedro' });
      await repo.save(newData);
      await createDatabase(tenantId);
      const connection = await getDatabaseConnection(tenantId);
      await connection.synchronize();
      Logger.info(`Database and tables created for tenant ${tenantId}`);
      res.status(201).json({
        message: `Database and tables created for tenant ${tenantId}`,
      });
    } catch (error) {
      Logger.err(error, true);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
