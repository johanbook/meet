import React from "react";

import { Box, List, Typography } from "@mui/material";

import { AllMatchesDetails } from "src/api";
import { MatchListItem } from "src/components/MatchListitem";

import { MatchesPageNewMatches } from "../components/MatchesPageNewMatches";

export interface MatchesPageDataViewProps {
  data: AllMatchesDetails;
}

export function MatchesPageDataView({
  data,
}: MatchesPageDataViewProps): React.ReactElement {
  return (
    <>
      <Typography gutterBottom variant="h5">
        New matches
      </Typography>

      <Box sx={{ paddingBottom: 2 }}>
        <MatchesPageNewMatches matches={data.notTalkedTo} />
      </Box>

      <Typography gutterBottom variant="h5">
        Chats
      </Typography>

      {data.talkedTo.length === 0 && (
        <Typography color="textSecondary">
          No chats started yet. Why not start a conversation with one of your matches?{" "}
        </Typography>
      )}

      <List>
        {data.talkedTo.map((match) => (
          <MatchListItem key={match.profileId} data={match} />
        ))}
      </List>
    </>
  );
}
