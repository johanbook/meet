import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { CalendarEventDetails } from "src/api";

interface CalendarPageComponentProps {
  events: CalendarEventDetails[];
}

export function CalendarPageComponent({
  events,
}: CalendarPageComponentProps): ReactElement {
  if (events.length === 0) {
    return <Typography>There are no calendar events here yet</Typography>;
  }

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
}
