import dayjs from "dayjs";

import { DateRange } from "../DateRangePicker";

export const DATE_SHORTCUTS: Record<string, DateRange> = {
  LastWeek: { from: dayjs().subtract(1, "week").toDate(), to: new Date() },
  LastMonth: { from: dayjs().subtract(1, "month").toDate(), to: new Date() },
  LastYear: { from: dayjs().subtract(1, "year").toDate(), to: new Date() },
};
