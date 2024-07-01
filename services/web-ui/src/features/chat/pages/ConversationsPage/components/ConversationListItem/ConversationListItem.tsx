import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { ChatConversationDetails } from "src/api";

export interface ConversationListItemProps {
  data: ChatConversationDetails;
  divider?: boolean;
}

export function ConversationListItem({
  data,
  divider,
}: ConversationListItemProps): React.ReactElement {
  return (
    <ListItem divider={divider}>
      <ListItemButton component={Link} to={`/chat/${data.id}`}>
        <ListItemAvatar>
          <Avatar src={data.imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={data.name} secondary={data.lastMessage} />
      </ListItemButton>
    </ListItem>
  );
}
