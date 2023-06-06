import React from "react";

import { Avatar, Box } from "@mui/material";

import { MatchDetails } from "src/api";
import { FALLBACK_IMAGES } from "src/constants/images";

export interface MatchesPageNewMatchesProps {
  matches: MatchDetails[];
}

export function MatchesPageNewMatches({
  matches,
}: MatchesPageNewMatchesProps): React.ReactElement {
  return (
    <Box sx={{ display: "flex" }}>
      {matches.map((match) => (
        <Avatar
          key={match.profileId}
          src={match.imageUrl || FALLBACK_IMAGES.PROFILE_IMAGE_URL}
        />
      ))}
    </Box>
  );
}
