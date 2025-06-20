import { beforeEach, describe, it, vi } from "src/test";

import { HealthCheckService } from "./health-check.service";

describe(HealthCheckService.name, () => {
  let healthCheckService: HealthCheckService;

  beforeEach(() => {
    healthCheckService = new HealthCheckService({
      createQueryRunner: () => ({
        connect: vi.fn(),
        query: vi.fn(),
        release: vi.fn(),
      }),
    } as any);
  });

  it("runs health check", async () => {
    await healthCheckService.healthcheck();
  });
});
