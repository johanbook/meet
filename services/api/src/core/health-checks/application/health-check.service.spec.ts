import { HealthCheckService } from "./health-check.service";

describe(HealthCheckService.name, () => {
  let healthCheckService: HealthCheckService;

  beforeEach(() => {
    healthCheckService = new HealthCheckService({
      createQueryRunner: jest.fn(),
    } as any);
  });

  it("runs health check", async () => {
    await healthCheckService.healthcheck();
  });
});
