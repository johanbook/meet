import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { TestSeeder } from "src/core/database";

import { TimeSeriesPoint } from "../entities/time-series-point.entity";
import { TimeSeries } from "../entities/time-series.entity";

const NUM_POINTS = 100;

@TestSeeder()
export default class CreateTestTimeSeries implements Seeder {
  // Ensure seeder only runs once
  track = true;

  public async run(
    _: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const timeSeriesFactory = factoryManager.get(TimeSeries);
    const timeSeriesPointFactory = factoryManager.get(TimeSeriesPoint);

    const points: TimeSeriesPoint[] = [];

    for (let index = 0; index < NUM_POINTS; index += 1) {
      const point = await timeSeriesPointFactory.make({ profileId: 1 });
      points.push(point);
    }

    await timeSeriesFactory.save({
      points: points,
      profileId: 1,
      organizationId: 1,
    });
  }
}
