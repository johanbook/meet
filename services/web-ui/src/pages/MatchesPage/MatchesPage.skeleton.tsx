import React from "react";

import { List, ListItem, Skeleton, Typography } from "@mui/material";

export function MatchesPageSkeleton(): React.ReactElement {
  return (
    <>
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
