import dayjs from "dayjs";

import { getWeek } from "src/utils/time";

export function getAllDatesInCurrentMonth(): dayjs.Dayjs[] {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const dates: dayjs.Dayjs[] = [];

  for (
    let date = startOfMonth;
    date.isBefore(endOfMonth) || date.isSame(endOfMonth, "day");
    date = date.add(1, "day")
  ) {
    dates.push(date.clone());
  }

  return dates;
}

export function getDateGrid(): Record<number, dayjs.Dayjs[]> {
  const grid: Record<number, dayjs.Dayjs[]> = {};

  const dates = getAllDatesInCurrentMonth();

  for (const date of dates) {
    const weekNumber = getWeek(date);

    if (weekNumber in grid) {
      grid[weekNumber].push(date);
    } else {
      grid[weekNumber] = [date];
    }
  }

  return grid;
}
