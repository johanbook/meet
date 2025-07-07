import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeriesPoint } from "../../../infrastructure/entities/time-series-point.entity";
import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { DeleteTimeSeriesPointCommand } from "../../contracts/commands/delete-time-series-point.command";
import { DeleteTimeSeriesPointHandler } from "./delete-time-series-point.handler";

describe(DeleteTimeSeriesPointHandler.name, () => {
  let timeSeries: Repository<TimeSeries>;
  let timeSeriesPoints: Repository<TimeSeriesPoint>;
  let commandHandler: DeleteTimeSeriesPointHandler;

  beforeEach(() => {
    timeSeries = createMockRepository<TimeSeries>([
      { id: "1", name: "my-time-series" } as unknown as TimeSeries,
    ]);
    timeSeriesPoints = createMockRepository<TimeSeriesPoint>([
      {
        id: "1",
        timeSeriesId: "1",
        value: 123,
        description: "my-description",
      } as unknown as TimeSeriesPoint,
    ]);
    commandHandler = new DeleteTimeSeriesPointHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      timeSeries,
      timeSeriesPoints,
    );
  });

  describe("can delete time series point", () => {
    it("should delete a time series point", async () => {
      const command = map(DeleteTimeSeriesPointCommand, {
        timeSeriesId: "1",
        pointId: "1",
      });

      await commandHandler.execute(command);

      const savedPoints = await timeSeriesPoints.find();
      expect(savedPoints).toHaveLength(0);
    });
  });
});
