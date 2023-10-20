import React from "react";

import { List, ListItem, Skeleton } from "@mui/material";

export function JournalPageSkeleton(): React.ReactElement {
  const data = [1, 2, 3, 4, 5];
  return (
    <List>
      {data.map((index) => (
        <ListItem key={index}>
          <Skeleton height={30} width={400} />
        </ListItem>
      ))}
    </List>
  );
}
