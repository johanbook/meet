import { ReactElement } from "react";

import { Box, Skeleton } from "@mui/material";

const getNumberArray = (length: number): number[] => {
  const array: number[] = [];

  for (let x = 0; x < length; x++) {
    array.push(x);
  }

  return array;
};

export function BlogPhotoListPageSkeleton(): ReactElement {
  const photos = [3, 1, 4, 2];

  return (
    <>
      {photos.map((photo, index) => (
        <Box key={index} sx={{ pt: 3, px: 1 }}>
          <Skeleton />

          <Box sx={{ display: "flex", gap: 1, pt: 1 }}>
            {getNumberArray(photo).map((v) => (
              <Skeleton
                key={index + "" + v}
                sx={{ height: 100, width: 100 }}
                variant="rectangular"
              />
            ))}
            <Skeleton variant="rectangular" />
          </Box>
        </Box>
      ))}
    </>
  );
}
