import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { Logger } from "src/core/logging";

import { HealthCheckService } from "../../application/health-check.service";

@Injectable()
export class HealthChecksJobs {
  private readonly logger = new Logger(HealthChecksJobs.name);

  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async rungDiagnostics(): Promise<void> {
    const result = await this.healthCheckService.runDiagnostics();

    if (result.status === "ok") {
      this.logger.debug("Diagnostics completed. Everything OK.");
    } else {
      this.logger.error("Encountered errors when running diagnostics", {
        errors: result.errors,
      });
    }
  }
}
