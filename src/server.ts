import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import AppLogger from './infra/monitoring/app.logger';
import { TenantController } from './http/rest/controller/tenant.controller';
import { UserController } from './http/rest/controller/user.controller';

export class AppServer extends Server {
  private server_port;
  constructor(port: number) {
    super(process.env.NODE_ENV === 'development');
    this.server_port = port;
    this.initializeMiddlewares();
    this.setupControllers();
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupControllers(): void {
    const tenantController = new TenantController();
    const userController = new UserController();
    this.addControllers([tenantController, userController]);
  }

  public start(): void {
    this.app.listen(this.server_port, () => {
      AppLogger.info('Server listening on port: ' + this.server_port);
    });
  }
}
