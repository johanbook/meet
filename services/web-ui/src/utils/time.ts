import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(isoWeek);
dayjs.extend(relativeTime);
dayjs.extend(utc);
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

export function getWeekDay(
  date: string | Date | dayjs.Dayjs,
  format: "short" | "long" = "long",
): string {
  return dayjs(date).format(format === "long" ? "dddd" : "ddd");
}

export function parseDateInUTC(date: string): Date {
  return dayjs.utc(date).toDate();
}
