import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { MatchDetails } from "src/api";

export interface MatchListItemProps {
  data: MatchDetails;
  divider?: boolean;
}

export function MatchListItem({
  data,
  divider,
}: MatchListItemProps): React.ReactElement {
  return (
    <ListItem divider={divider}>
      <ListItemButton component={Link} to={`/chat/${data.profileId}`}>
        <ListItemAvatar>
          <Avatar src={data.imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={data.name} secondary={data.lastMessage} />
      </ListItemButton>
    </ListItem>
  );
}
