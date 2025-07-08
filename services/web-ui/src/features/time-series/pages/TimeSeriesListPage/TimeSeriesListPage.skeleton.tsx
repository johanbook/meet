import { FC } from "react";

import { List, ListItem, ListItemText, Skeleton } from "@mui/material";

const ITEMS = [150, 75, 180, 140, 80, 90, 130, 210, 70];

export const TimeSeriesListPageSkeleton: FC = () => {
  return (
    <List>
      {ITEMS.map((item) => (
        <ListItem key={item}>
          <ListItemText
            primary={<Skeleton height={30} width={60} />}
            secondary={<Skeleton height={25} width={item} />}
          />
        </ListItem>
      ))}
    </List>
  );
};
