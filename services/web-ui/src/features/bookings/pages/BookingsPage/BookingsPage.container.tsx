import { ReactElement } from "react";

import { calendarApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { BookingsPageComponent } from "./BookingsPage.component";
import { BookingsPageNav } from "./BookingsPage.nav";
import { BookingsPageSkeleton } from "./BookingsPage.skeleton";

export function BookingsPageContainer(): ReactElement {
  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeysConstants.CalendarEventList],
    queryFn: () => calendarApi.getCalendarEventList(),
  });

  if (isLoading) {
    return (
      <BookingsPageNav>
        <BookingsPageSkeleton />
      </BookingsPageNav>
    );
  }

  if (error || !data) {
    return (
      <BookingsPageNav>
        <ErrorView />
      </BookingsPageNav>
    );
  }

  return (
    <BookingsPageNav>
      <BookingsPageComponent events={data} />
    </BookingsPageNav>
  );
}
