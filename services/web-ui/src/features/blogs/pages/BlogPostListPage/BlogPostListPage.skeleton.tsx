import { ReactElement } from "react";

import { Box, Skeleton } from "@mui/material";

export function BlogPostListPageSkeleton(): ReactElement {
  const skeletons = [100, 200, 110, 170, 50, 90];

  return (
    <>
      {skeletons.map((width) => (
        <Box key={width} sx={{ py: 2, borderTop: 1, borderColor: "divider" }}>
          <Box sx={{ alignItems: "center", display: "flex", pb: 2, pl: 2 }}>
            <Skeleton height={40} variant="circular" width={40} />

            <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
              <Skeleton width={width} />
            </Box>
          </Box>

          <Box sx={{ px: 2 }}>
            <Skeleton />
          </Box>

          <Skeleton height={140} />
        </Box>
      ))}
    </>
  );
}
