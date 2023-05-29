import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { Logger } from "src/infrastructure/logger.service";

import { HealthCheckService } from "../../application/health-check.service";

@Injectable()
export class HealthChecksJobs {
  private readonly logger = new Logger(HealthChecksJobs.name);

  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async rungDiagnostics(): Promise<void> {
    const result = await this.healthCheckService.rungDiagnostics();

    if (result.status === "ok") {
      this.logger.debug("Diagnostics completed. Everything OK.");
    } else {
      this.logger.warn("Errors encountered when running diagnosticskkj");
    }
  }
}
