import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

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
    const weekNumber = dayjs(date).week();

    if (weekNumber in grid) {
      grid[weekNumber].push(date);
    } else {
      grid[weekNumber] = [date];
    }
  }

  return grid;
}
