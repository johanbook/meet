import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { TestSeeder } from "src/core/database";

import { TimeSeriesPoint } from "../entities/time-series-point.entity";
import { TimeSeries } from "../entities/time-series.entity";

const NUM_POINTS = 100;

@TestSeeder()
export default class CreateTimeSeries implements Seeder {
  public async run(
    _: DataSource,
    factoryManger: SeederFactoryManager,
  ): Promise<void> {
    const timeSeriesFactory = factoryManger.get(TimeSeries);
    const timeSeriesPointFactory = factoryManger.get(TimeSeriesPoint);

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
