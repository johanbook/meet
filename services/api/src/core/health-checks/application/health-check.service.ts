import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Logger } from "src/infrastructure/logger.service";
import { map } from "src/utils/mapper";

import {
  HealthCheckDetails,
  HealthCheckStatus,
} from "./contracts/dtos/health-check-details.dto";

@Injectable()
export class HealthCheckService {
  private logger = new Logger(HealthCheckService.name);

  constructor(private readonly dataSource: DataSource) {}

  async healthcheck(): Promise<HealthCheckDetails> {
    let status: HealthCheckStatus = "ok";

    const databaseOK = await this.checkDatabase();

    if (!databaseOK) {
      status = "error";
    }

    return map(HealthCheckDetails, { status });
  }

  async rungDiagnostics(): Promise<HealthCheckDetails> {
    return await this.healthcheck();
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.query("SELECT 1;");
      return true;
    } catch {
      this.logger.error("Unable to reach database");
      return false;
    }
  }
}
