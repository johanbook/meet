import dayjs, { Dayjs } from "dayjs";

import { getWeek } from "src/utils/time";

/**
 * Every day of the current month, from the first to the last.
 */
export function getAllDatesInCurrentMonth(): Dayjs[] {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const dates: Dayjs[] = [];

  for (
    let date = startOfMonth;
    date.isBefore(endOfMonth) || date.isSame(endOfMonth, "day");
    date = date.add(1, "day")
  ) {
    dates.push(date.clone());
  }

  return dates;
}

/**
 * Days of the current month grouped into ISO weeks (1-based week number), so
 * the calendar renders as rows of day cells — web-ui parity.
 */
export function getDateGrid(): Record<number, Dayjs[]> {
  const grid: Record<number, Dayjs[]> = {};

  const dates = getAllDatesInCurrentMonth();

  for (const date of dates) {
    const weekNumber = getWeek(date);

    (grid[weekNumber] ??= []).push(date);
  }

  return grid;
}
