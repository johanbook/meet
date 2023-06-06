import React from "react";
import { Link } from "react-router-dom";

import { Avatar, Box, Typography } from "@mui/material";

import { MatchDetails } from "src/api";
import { FALLBACK_IMAGES } from "src/constants/images";

export interface MatchesPageNewMatchesProps {
  matches: MatchDetails[];
}

export function MatchesPageNewMatches({
  matches,
}: MatchesPageNewMatchesProps): React.ReactElement {
  if (matches.length === 0) {
    return <Typography color="textSecondary">No new matches</Typography>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {matches.map((match) => (
        <Avatar
          component={Link}
          key={match.profileId}
          src={match.imageUrl || FALLBACK_IMAGES.PROFILE_IMAGE_URL}
          to={`/chat/${match.profileId}`}
        />
      ))}
    </Box>
  );
}
