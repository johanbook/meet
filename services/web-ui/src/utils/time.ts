import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function timeSince(time: string): string {
  const date = dayjs(time);
  return date.fromNow();
}
