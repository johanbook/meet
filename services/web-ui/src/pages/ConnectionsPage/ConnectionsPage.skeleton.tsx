import React from "react";

import { List, ListItem, Skeleton } from "@mui/material";

export function ConnectionsPageSkeleton(): React.ReactElement {
  return (
    <>
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
