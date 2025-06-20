import { ReactElement } from "react";

import { Box, Skeleton } from "@mui/material";

export function BlogPostPageSkeleton(): ReactElement {
  return (
    <Box sx={{ marginBottom: 2, padding: 2 }}>
      <Box sx={{ alignItems: "center", display: "flex", paddingBottom: 2 }}>
        <Skeleton height={40} variant="circular" width={40} />

        <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
          <Skeleton width={200} />
        </Box>
      </Box>

      <Skeleton />

      <Skeleton height={100} sx={{ padding: 1 }} />
    </Box>
  );
}
