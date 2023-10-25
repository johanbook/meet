import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Logger } from "src/core/logging";
import { map } from "src/core/mapper";

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
    const errors: unknown[] = [];
    let status: HealthCheckStatus = "ok";

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query("SELECT 1;");
    } catch (error) {
      errors.push(error);
      status = "error";

      this.logger.error("Unable to reach database", { error });
    } finally {
      await queryRunner.release();
    }

    return map(HealthCheckDetails, { errors, status });
  }
}
