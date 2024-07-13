import { ReactElement } from "react";

import { List, ListItem, Skeleton } from "@mui/material";

export function ChatListPageSkeleton(): ReactElement {
  return (
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
  );
}
