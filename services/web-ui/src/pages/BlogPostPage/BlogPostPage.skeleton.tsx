import React from "react";

import { Box, Card, Skeleton } from "@mui/material";

import { BlogPostForm } from "./components/BlogPostForm";

export function BlogPostPageSkeleton(): React.ReactElement {
  const skeletons = [100, 200, 110, 170, 50, 90];

  return (
    <>
      <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
        <BlogPostForm />
      </Box>

      {skeletons.map((width) => (
        <Card
          key={width}
          sx={{ marginBottom: 2, padding: 2 }}
          variant="outlined"
        >
          <Box sx={{ alignItems: "center", display: "flex", paddingBottom: 2 }}>
            <Skeleton height={40} variant="circular" width={40} />

            <Box sx={{ flexGrow: 1, paddingLeft: 1 }}>
              <Skeleton width={width} />
            </Box>
          </Box>

          <Skeleton />

          <Skeleton height={100} sx={{ padding: 1 }} />
        </Card>
      ))}
    </>
  );
}
