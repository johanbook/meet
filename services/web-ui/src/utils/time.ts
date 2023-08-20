import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getDate(time: string): string {
  const date = dayjs(time);
  return date.format("YYYY-MM-DD");
}

export function timeSince(time: string): string {
  const date = dayjs(time);
  return date.fromNow();
}
