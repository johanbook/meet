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
import { FALLBACK_IMAGES } from "src/constants/images";

export interface MatchListItemProps {
  data: MatchDetails;
}

export function MatchListItem({
  data,
}: MatchListItemProps): React.ReactElement {
  const imageUrl = data.imageUrl || FALLBACK_IMAGES.PROFILE_IMAGE_URL;

  return (
    <ListItem divider>
      <ListItemButton component={Link} to={`/chat/${data.profileId}`}>
        <ListItemAvatar>
          <Avatar src={imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={data.name} secondary={data.lastMessage} />
      </ListItemButton>
    </ListItem>
  );
}
