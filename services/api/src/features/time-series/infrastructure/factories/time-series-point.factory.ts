import { setSeederFactory } from "typeorm-extension";

import { TimeSeriesPoint } from "../entities/time-series-point.entity";

const LABELS = ["John", "Eric", "Oscar"];

export const TimeSeriesPointFactory = setSeederFactory(
  TimeSeriesPoint,
  (faker) => {
    const point = new TimeSeriesPoint();
    point.description = faker.lorem.sentence();
    point.label = faker.helpers.arrayElement(LABELS);
    point.value = faker.number.int({ min: -2, max: 5 });
    point.createdAt = faker.date.past();
    return point;
  },
);
