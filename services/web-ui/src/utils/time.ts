import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export function getDate(time: string): string {
  const date = dayjs(time);
  return date.format("YYYY-MM-DD");
}

export function timeSince(time: string): string {
  const date = dayjs(time);
  return date.fromNow();
}

export function getDateDaysAgo(days: number): Date {
  return dayjs().subtract(days, "day").toDate();
}

export function getDateYearsAgo(years: number): Date {
  return dayjs().subtract(years, "year").toDate();
}

export function getWeek(date: string | Date | dayjs.Dayjs): number {
  return dayjs(date).week();
}

export function getWeekDay(date: string | Date | dayjs.Dayjs): string {
  return dayjs(date).format("dddd");
}
