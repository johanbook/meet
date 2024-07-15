import React from "react";
import { Link } from "react-router-dom";

import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { ChatConversationDetails } from "src/api";
import { ProfileAvatar } from "src/components/ProfileAvatar";

interface ConversationListItemProps {
  data: ChatConversationDetails;
}

export function ConversationListItem({
  data,
}: ConversationListItemProps): React.ReactElement {
  let imageUrl = data.imageUrl;
  let name = data.name;

  if (!name) {
    name = data.profiles.map((profile) => profile.name).join(", ");
  }

  if (!imageUrl) {
    imageUrl = data.profiles[0].imageUrl;
  }

  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={`/chat/${data.id}`}>
        <ListItemAvatar>
          <ProfileAvatar name={name} src={imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={data.lastMessage} />
      </ListItemButton>
    </ListItem>
  );
}
