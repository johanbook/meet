import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { ConnectionDetails } from "src/api";

export interface ConnectionListItemProps {
  data: ConnectionDetails;
  divider?: boolean;
}

export function ConnectionListItem({
  data,
  divider,
}: ConnectionListItemProps): React.ReactElement {
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
