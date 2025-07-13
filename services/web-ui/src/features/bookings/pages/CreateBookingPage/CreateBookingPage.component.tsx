import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { CalendarEventDetails } from "src/api";

interface CreateBookingPageComponentProps {
  data: CalendarEventDetails[];
}

export function CreateBookingPageComponent({
  data,
}: CreateBookingPageComponentProps): ReactElement {
  if (data.length === 0) {
    return (
      <>
        <Typography>You have no bookings</Typography>
      </>
    );
  }

  return (
    <div>
      {data.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
}
