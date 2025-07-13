import { ReactElement } from "react";

import { calendarApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { CalendarPageComponent } from "./CalendarPage.component";
import { CalendarPageNav } from "./CalendarPage.nav";
import { CalendarPageSkeleton } from "./CalendarPage.skeleton";

export function CalendarPageContainer(): ReactElement {
  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeysConstants.CalendarEventList],
    queryFn: () => calendarApi.getCalendarEventList(),
  });

  if (isLoading) {
    return (
      <CalendarPageNav>
        <CalendarPageSkeleton />
      </CalendarPageNav>
    );
  }

  if (error || !data) {
    return (
      <CalendarPageNav>
        <ErrorView />
      </CalendarPageNav>
    );
  }

  return (
    <CalendarPageNav>
      <CalendarPageComponent events={data} />
    </CalendarPageNav>
  );
}
