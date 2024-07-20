import { ReactElement } from "react";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

export function ChatListPageSkeleton(): ReactElement {
  const items = [150, 75, 180, 140, 80, 90, 130, 210, 70];

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemAvatar>
            <Skeleton sx={{ height: 38, width: 38 }} variant="circular" />
          </ListItemAvatar>

          <ListItemText
            primary={<Skeleton height={30} width={60} />}
            secondary={<Skeleton height={25} width={item} />}
          />
        </ListItem>
      ))}
    </List>
  );
}
