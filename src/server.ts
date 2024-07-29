import './util/module-alias';
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import Logger from 'jet-logger';
import { UserController } from './http/rest/controller/tenant.controller';

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
    const userController = new UserController();
    this.addControllers([userController]);
  }

  public start(): void {
    this.app.listen(this.server_port, () => {
      Logger.imp('Server listening on port: ' + this.server_port);
    });
  }
}
