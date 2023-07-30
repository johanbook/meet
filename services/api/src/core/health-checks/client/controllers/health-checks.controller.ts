import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { HealthCheckDetails } from "../../application/contracts/dtos/health-check-details.dto";
import { HealthCheckService } from "../../application/health-check.service";

@Controller("health")
@ApiTags("health")
export class HealthChecksController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async healthcheck(): Promise<HealthCheckDetails> {
    return await this.healthCheckService.healthcheck();
  }

  @Get("/live")
  async live(): Promise<HealthCheckDetails> {
    return await this.healthCheckService.healthcheck();
  }

  @Get("/ready")
  async ready(): Promise<HealthCheckDetails> {
    return await this.healthCheckService.healthcheck();
  }
}
