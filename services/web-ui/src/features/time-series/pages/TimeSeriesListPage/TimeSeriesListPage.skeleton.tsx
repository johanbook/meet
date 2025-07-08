import { FC } from "react";

import { Box, Skeleton } from "@mui/material";

export const TimeSeriesListPageSkeleton: FC = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
      },
      gap: 2,
    }}
  >
    {Array.from({ length: 9 }).map((_, index) => (
      <Skeleton key={index} variant="rectangular" height={140} />
    ))}
  </Box>
);
