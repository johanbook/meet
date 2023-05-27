import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { Logger } from "src/infrastructure/logger.service";

@Injectable()
export class HealthCheckJobs {
  private readonly logger = new Logger(HealthCheckJobs.name);

  @Cron(CronExpression.EVERY_30_MINUTES)
  performHealthCheck() {
    this.logger.log("Health ok");
  }
}
