import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { UpdateTimeSeriesCommand } from "../../contracts/commands/update-time-series.command";
import { UpdateTimeSeriesHandler } from "./update-time-series.handler";

describe(UpdateTimeSeriesHandler.name, () => {
  let timeSeries: Repository<TimeSeries>;
  let commandHandler: UpdateTimeSeriesHandler;

  beforeEach(() => {
    timeSeries = createMockRepository<TimeSeries>([
      {
        id: "1",
        name: "my-time-series",
        description: "my-description",
      } as TimeSeries,
    ]);
    commandHandler = new UpdateTimeSeriesHandler(timeSeries);
  });

  describe("can update time series", () => {
    it("should update changes to time series", async () => {
      const command = map(UpdateTimeSeriesCommand, {
        id: "1",
        name: "my-updated-time-series",
        description: "my-updated-description",
      });

      await commandHandler.execute(command);

      const savedTimeSeries = await timeSeries.find();
      expect(savedTimeSeries).toHaveLength(1);

      const timeSeriesEntry = savedTimeSeries[0];
      expect(timeSeriesEntry.name).toBe("my-updated-time-series");
      expect(timeSeriesEntry.description).toBe("my-updated-description");
    });
  });
});
