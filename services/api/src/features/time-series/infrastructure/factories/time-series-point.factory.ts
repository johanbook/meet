import { setSeederFactory } from "typeorm-extension";

import { TimeSeriesPoint } from "../entities/time-series-point.entity";

export const TimeSeriesPointFactory = setSeederFactory(
  TimeSeriesPoint,
  (faker) => {
    const point = new TimeSeriesPoint();
    point.label = faker.lorem.word();
    point.value = faker.number.float();
    point.createdAt = faker.date.past();
    return point;
  },
);
