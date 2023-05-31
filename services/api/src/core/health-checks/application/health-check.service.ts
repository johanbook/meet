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
    const errors: unknown[] = [];
    let status: HealthCheckStatus = "ok";

    const healthChecksToRun: Promise<HealthCheckDetails>[] = [
      this.checkDatabase(),
    ];

    const results = await Promise.all(healthChecksToRun);

    for (const result of results) {
      if (result.status === "ok") {
        continue;
      }

      status = "error";
      errors.push(...result.errors);
    }

    return map(HealthCheckDetails, { errors, status });
  }

  async runDiagnostics(): Promise<HealthCheckDetails> {
    return await this.healthcheck();
  }

  private async checkDatabase(): Promise<HealthCheckDetails> {
    try {
      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.query("SELECT 1;");
      return map(HealthCheckDetails, { errors: [], status: "ok" });
    } catch (error) {
      this.logger.error({ msg: "Unable to reach database", error });
      return map(HealthCheckDetails, { errors: [error], status: "error" });
    }
  }
}
