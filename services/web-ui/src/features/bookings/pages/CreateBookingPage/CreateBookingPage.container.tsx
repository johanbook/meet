import { ReactElement } from "react";

import { calendarApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { CreateBookingPageComponent } from "./CreateBookingPage.component";
import { CreateBookingPageNav } from "./CreateBookingPage.nav";
import { CreateBookingPageSkeleton } from "./CreateBookingPage.skeleton";

export function CreateBookingPageContainer(): ReactElement {
  const { error, data, isLoading } = useQuery({
    queryKey: [CacheKeysConstants.CalendarEventList],
    queryFn: () => calendarApi.getCalendarEventList(),
  });

  if (isLoading) {
    return (
      <CreateBookingPageNav>
        <CreateBookingPageSkeleton />
      </CreateBookingPageNav>
    );
  }

  if (error || !data) {
    return (
      <CreateBookingPageNav>
        <ErrorView />
      </CreateBookingPageNav>
    );
  }

  return (
    <CreateBookingPageNav>
      <CreateBookingPageComponent data={data} />
    </CreateBookingPageNav>
  );
}
