import { Controller, Post } from "@overnightjs/core";
import {
  createDatabase,
  getDatabaseConnection,
} from "../../../../database/typeorm/migration.datasource";
import Logger from "jet-logger";
import { Request, Response } from "express";

@Controller("api/tenant")
export class UserController {
  @Post()
  private async add(req: Request, res: Response) {
    Logger.info(req.body, true);
    const { tenantId } = req.body;

    if (!tenantId) {
      return res.status(400).json({ error: "Tenant ID is required" });
    }

    try {
      await createDatabase(tenantId);
      const connection = await getDatabaseConnection(tenantId);
      await connection.synchronize();
      Logger.info("DATABSE CREATED");
      res.status(201).json({
        message: `Database and tables created for tenant ${tenantId}`,
      });
    } catch (error) {
      Logger.err(error, true);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
