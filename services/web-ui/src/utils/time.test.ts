import { afterEach, beforeEach, describe, expect, it, vi } from "src/test";

import {
  getDate,
  getDateDaysAgo,
  getWeek,
  getWeekDay,
  timeSince,
} from "./time";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2000-12-31"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe(getDate.name, () => {
  it("parses and formats a date", () => {
    expect(getDate("2000-01-01")).toBe("2000-01-01");
  });
});

describe(timeSince.name, () => {
  it("returns correct string", () => {
    expect(timeSince("2000-12-30")).toBe("a day ago");
    expect(timeSince("2000-01-01")).toBe("a year ago");
  });
});

describe(getDateDaysAgo.name, () => {
  it("parses correct dates", () => {
    expect(getDateDaysAgo(1).toJSON()).toBe("2000-12-30T00:00:00.000Z");
  });
});

describe(getWeek.name, () => {
  it("parses correct week", () => {
    expect(getWeek("2000-01-01")).toBe(1);
  });
});

describe(getWeekDay.name, () => {
  it("parses correct weekday", () => {
    expect(getWeekDay("2025-07-24")).toBe("Thursday");
  });
});
