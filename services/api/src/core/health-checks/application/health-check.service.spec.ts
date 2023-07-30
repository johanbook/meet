import { HealthCheckService } from "./health-check.service";

describe(HealthCheckService.name, () => {
  let healthCheckService: HealthCheckService;

  beforeEach(() => {
    healthCheckService = new HealthCheckService({
      createQueryRunner: () => ({
        connect: jest.fn(),
        query: jest.fn(),
        release: jest.fn(),
      }),
    } as any);
  });

  it("runs health check", async () => {
    await healthCheckService.healthcheck();
  });
});
