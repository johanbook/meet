import React from "react";

import { Box, List, ListItem, Skeleton, Typography } from "@mui/material";

export function MatchesPageLoadingView(): React.ReactElement {
  return (
    <>
      <Typography gutterBottom variant="h5">
        Connections
      </Typography>

      <Box sx={{ display: "flex", paddingBottom: 2 }}>
        <Skeleton height={40} width={40} variant="circular" />
        <Skeleton height={40} width={40} variant="circular" />
        <Skeleton height={40} width={40} variant="circular" />
      </Box>

      <Typography gutterBottom variant="h5">
        Chats
      </Typography>

      <List>
        <ListItem divider>
          <Skeleton height={50} width="100%" />
        </ListItem>

        <ListItem divider>
          <Skeleton height={50} width="100%" />
        </ListItem>

        <ListItem divider>
          <Skeleton height={50} width="100%" />
        </ListItem>
      </List>
    </>
  );
}
