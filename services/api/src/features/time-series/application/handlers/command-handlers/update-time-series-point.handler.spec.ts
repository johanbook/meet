import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeriesPoint } from "../../../infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { makeTimeSeriesPoint } from "../../../test/factories/time-series-point.factory";
import { makeTimeSeries } from "../../../test/factories/time-series.factory";
import { UpdateTimeSeriesPointCommand } from "../../contracts/commands/update-time-series-point.command";
import { UpdateTimeSeriesPointHandler } from "./update-time-series-point.handler";

describe(UpdateTimeSeriesPointHandler.name, () => {
  let timeSeries: Repository<TimeSeries>;
  let timeSeriesPoints: Repository<TimeSeriesPoint>;
  let commandHandler: UpdateTimeSeriesPointHandler;

  beforeEach(() => {
    timeSeries = createMockRepository<TimeSeries>([makeTimeSeries()]);
    timeSeriesPoints = createMockRepository<TimeSeriesPoint>([
      makeTimeSeriesPoint(),
    ]);
    commandHandler = new UpdateTimeSeriesPointHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      timeSeries,
      timeSeriesPoints,
    );
  });

  describe("can update time series point", () => {
    it("should update a time series point", async () => {
      const command = map(UpdateTimeSeriesPointCommand, {
        timeSeriesId: "1",
        pointId: "1",
        value: 456,
        description: "my-updated-description",
        label: "my-updated-label",
      });

      await commandHandler.execute(command);

      const savedPoints = await timeSeriesPoints.find();
      expect(savedPoints).toHaveLength(1);

      const point = savedPoints[0];
      expect(point.value).toBe(456);
      expect(point.description).toBe("my-updated-description");
      expect(point.label).toBe("my-updated-label");
    });

    it("should trim the label when updating a point", async () => {
      const command = map(UpdateTimeSeriesPointCommand, {
        timeSeriesId: "1",
        pointId: "1",
        description: "my-point-description",
        label: "  my-label  ",
        value: 123,
      });

      await commandHandler.execute(command);

      const [point] = await timeSeriesPoints.find();

      expect(point.label).toBe("my-label");
    });
  });
});
