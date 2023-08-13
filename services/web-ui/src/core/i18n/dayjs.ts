import dayjs from "dayjs";
import "dayjs/locale/da";
import "dayjs/locale/en";
import "dayjs/locale/sv";
import "dayjs/locale/zh";

export function registerDayjsLocale(locale: string) {
  dayjs.locale(locale);
}
