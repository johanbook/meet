import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { TimeSeries } from "../../../infrastructure/entities/time-series.entity";
import { DeleteTimeSeriesCommand } from "../../contracts/commands/delete-time-series.command";
import { DeleteTimeSeriesHandler } from "./delete-time-series.handler";

describe(DeleteTimeSeriesHandler.name, () => {
  let timeSeries: Repository<TimeSeries>;
  let commandHandler: DeleteTimeSeriesHandler;

  beforeEach(() => {
    timeSeries = createMockRepository<TimeSeries>([
      {
        id: "1",
        name: "my-time-series",
        description: "my-description",
      } as unknown as TimeSeries,
    ]);
    commandHandler = new DeleteTimeSeriesHandler(
      { authorizeOwnerOrAdmin: vi.fn() } as any,
      timeSeries,
    );
  });

  describe("can delete time series", () => {
    it("should delete a time series", async () => {
      const command = map(DeleteTimeSeriesCommand, {
        id: "1",
      });

      await commandHandler.execute(command);

      const savedTimeSeries = await timeSeries.find();
      expect(savedTimeSeries).toHaveLength(0);
    });
  });
});
