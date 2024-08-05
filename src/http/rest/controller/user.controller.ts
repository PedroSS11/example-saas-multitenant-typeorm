import { Controller, Get } from '@overnightjs/core';
import { UserService } from 'src/core/services/core/user.service';
import { Request, Response } from 'express';
import AppLogger from 'src/infra/monitoring/app.logger';

@Controller('/api/user')
export class UserController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  @Get()
  private async add(req: Request, res: Response): Promise<void> {
    const tenantName = req.params.tenant;
    try {
      await this._userService.initialize(tenantName);
      await this._userService.create();
    } catch (error) {
      AppLogger.error(`An error ocurred - User.controller: ${error}`);
      res.status(500).json({ error: error });
    }
  }
}
