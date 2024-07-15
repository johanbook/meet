import { ReactElement } from "react";

import { Box, Skeleton } from "@mui/material";

export function ChatPageSkeleton(): ReactElement {
  const messages = [89, 168, 104, 67, 184, 110, 80];
  return (
    <>
      {messages.map((width, index) => (
        <Box
          key={width}
          sx={{
            display: "flex",
            justifyContent: index % 2 ? "right" : "left",
          }}
        >
          <Skeleton
            height={42}
            sx={{
              borderRadius: 3,
              my: 1,
            }}
            width={width}
            variant="rectangular"
          />
        </Box>
      ))}
    </>
  );
}
