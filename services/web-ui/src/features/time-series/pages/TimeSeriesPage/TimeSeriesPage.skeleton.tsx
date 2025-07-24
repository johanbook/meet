import { FC } from "react";

import { Box, Skeleton, Stack } from "@mui/material";

export const TimeSeriesPageSkeleton: FC = () => (
  <Box>
    <Skeleton variant="rectangular" height={25} />

    <Stack direction="row" gap={2} sx={{ mt: 2 }}>
      <Skeleton variant="rectangular" height={112} width={164} />
      <Skeleton variant="rectangular" height={112} width={164} />
    </Stack>

    <Skeleton
      variant="rectangular"
      height={75}
      sx={{ mt: 2, borderRadius: 2 }}
    />
    <Skeleton
      variant="rectangular"
      height={500}
      sx={{ mt: 2, borderRadius: 2 }}
    />
    <Skeleton
      variant="rectangular"
      height={75}
      sx={{ mt: 2, borderRadius: 2 }}
    />
  </Box>
);
