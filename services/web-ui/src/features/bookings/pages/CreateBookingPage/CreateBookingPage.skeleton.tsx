import { ReactElement } from "react";

import { Skeleton, Stack } from "@mui/material";

export function CreateBookingPageSkeleton(): ReactElement {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" height={200} />
    </Stack>
  );
}
