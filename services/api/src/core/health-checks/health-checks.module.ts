import { Module } from "@nestjs/common";

import { HealthCheckService } from "./application/health-check.service";
import { HealthChecksController } from "./client/controllers/health-checks.controller";
import { HealthChecksJobs } from "./client/jobs/health-checks.jobs";

@Module({
  imports: [],
  controllers: [HealthChecksController],
  providers: [HealthChecksJobs, HealthCheckService],
})
export class HealthChecksModule {}
