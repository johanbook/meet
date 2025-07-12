import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { TestSuite } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeriesService } from "../../../domain/services/time-series.service";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { makeTimeSeries } from "../../../test/factories/time-series.factory";
import { AddPointToTimeSeriesCommand } from "../../contracts/commands/add-point-to-time-series.command";
import { AddPointToTimeSeriesHandler } from "./add-point-to-time-series.handler";

describe(AddPointToTimeSeriesHandler.name, () => {
  let timeSeries: Repository<TimeSeries>;
  let timeSeriesService: TimeSeriesService;
  let commandHandler: AddPointToTimeSeriesHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();
    timeSeries = createMockRepository<TimeSeries>([makeTimeSeries()]);
    timeSeriesService = new TimeSeriesService(testSuite.eventBus, timeSeries);
    commandHandler = new AddPointToTimeSeriesHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      testSuite.currentProfileService,
      timeSeries,
      timeSeriesService,
    );
  });

  describe("can add point to time series", () => {
    it("should add a point to a time series", async () => {
      const command = map(AddPointToTimeSeriesCommand, {
        description: "my-point-description",
        label: "my-label",
        timeSeriesId: "1",
        value: 123,
      });

      await commandHandler.execute(command);

      const savedTimeSeries = await timeSeries.find();
      expect(savedTimeSeries).toHaveLength(1);

      const timeSeriesEntry = savedTimeSeries[0];
      expect(timeSeriesEntry.points).toHaveLength(1);

      const point = timeSeriesEntry.points[0];
      expect(point.value).toBe(123);
      expect(point.description).toBe("my-point-description");
      expect(point.label).toBe("my-label");
      expect(point.profileId).toBe("my-profile-id");
    });

    it("should trim the label when adding a point", async () => {
      const command = map(AddPointToTimeSeriesCommand, {
        description: "my-point-description",
        label: "  my-label  ",
        timeSeriesId: "1",
        value: 123,
      });

      await commandHandler.execute(command);

      const [savedTimeSeries] = await timeSeries.find();
      const [point] = savedTimeSeries.points;

      expect(point.label).toBe("my-label");
    });
  });
});
