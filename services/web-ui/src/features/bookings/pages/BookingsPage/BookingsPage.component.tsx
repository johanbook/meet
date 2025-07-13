import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { BookingDetails } from "src/api";

interface BookingsPageComponentProps {
  events: BookingDetails[];
}

export function BookingsPageComponent({
  events,
}: BookingsPageComponentProps): ReactElement {
  if (events.length === 0) {
    return (
      <>
        <Typography>You have no bookings</Typography>
      </>
    );
  }

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
}
