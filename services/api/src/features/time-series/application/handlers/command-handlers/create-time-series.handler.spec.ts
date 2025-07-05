import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it } from "src/test";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeriesService } from "../../../domain/services/time-series.service";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { CreateTimeSeriesCommand } from "../../contracts/commands/create-time-series.command";
import { CreateTimeSeriesHandler } from "./create-time-series.handler";

describe(CreateTimeSeriesHandler.name, () => {
  let timeSeries: Repository<TimeSeries>;
  let timeSeriesService: TimeSeriesService;
  let commandHandler: CreateTimeSeriesHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();
    timeSeries = createMockRepository<TimeSeries>();
    timeSeriesService = new TimeSeriesService(testSuite.eventBus, timeSeries);
    commandHandler = new CreateTimeSeriesHandler(
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
      timeSeriesService,
    );
  });

  describe("can create time series", () => {
    it("should save changes to time series", async () => {
      const command = map(CreateTimeSeriesCommand, {
        name: "my-time-series",
        description: "my-description",
      });

      await commandHandler.execute(command);

      const savedTimeSeries = await timeSeries.find();
      expect(savedTimeSeries).toHaveLength(1);

      const timeSeriesEntry = savedTimeSeries[0];
      expect(timeSeriesEntry.name).toBe("my-time-series");
      expect(timeSeriesEntry.description).toBe("my-description");
      expect(timeSeriesEntry.organizationId).toBe("my-organization-id");
      expect(timeSeriesEntry.profileId).toBe("my-profile-id");
    });
  });
});
