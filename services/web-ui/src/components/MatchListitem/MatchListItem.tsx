import React from "react";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import {  MatchDetails } from "src/api";

export interface MatchListItemProps {
  data: MatchDetails;
}

export function MatchListItem({
  data,
}: MatchListItemProps): React.ReactElement {
  return (
    <ListItem divider>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary={data.name} />
      </ListItemButton>
    </ListItem>
  );
}
