import { FC } from "react";

import { Box, Skeleton } from "@mui/material";

export const TimeSeriesPageSkeleton: FC = () => (
  <Box>
    <Skeleton variant="rectangular" height={140} />
  </Box>
);
