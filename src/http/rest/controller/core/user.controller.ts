import { Controller, Get } from '@overnightjs/core';
import { UserService } from '../../../../core/services/core/user.service';
import { Request, Response } from 'express';
import AppLogger from '../../../../infra/monitoring/app.logger';
import { RegisterUserData } from '../../types/user.types';

@Controller('/api/user')
export class UserController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  @Get()
  private async add(req: Request, res: Response): Promise<void> {
    const tenantName = req.params.tenant;
    const { firstName, lastName, age, gender }: RegisterUserData = req.body;
    try {
      await this._userService.initialize(tenantName);
      await this._userService.create({ firstName, lastName, age, gender });
    } catch (error) {
      AppLogger.error(`An error ocurred - User.controller: ${error}`);
      res.status(500).json({ error: error });
    }
  }
}
