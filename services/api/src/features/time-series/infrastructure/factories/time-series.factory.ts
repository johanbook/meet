import { setSeederFactory } from "typeorm-extension";

import { TimeSeries } from "../entities/time-series.entity";

export const TimeSeriesFactory = setSeederFactory(TimeSeries, (faker) => {
  const timeSeries = new TimeSeries();
  timeSeries.name = faker.lorem.words(3);
  timeSeries.description = faker.lorem.sentence();
  return timeSeries;
});
