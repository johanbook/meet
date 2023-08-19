import React from "react";

import { List, Typography } from "@mui/material";

import { ConnectionDetails } from "src/api";
import { MatchListItem } from "src/components/MatchListitem";

export interface MatchesPageComponentProps {
  data: ConnectionDetails[];
}

export function MatchesPageComponent({
  data,
}: MatchesPageComponentProps): React.ReactElement {
  return (
    <>
      <Typography gutterBottom variant="h5">
        Chats
      </Typography>

      <List>
        {data.map((match) => (
          <MatchListItem key={match.profileId} data={match} />
        ))}
      </List>
    </>
  );
}
