import React from "react";

import { List } from "@mui/material";

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
      <List>
        {data.map((match, index) => (
          <MatchListItem
            divider={index < data.length - 1}
            key={match.profileId}
            data={match}
          />
        ))}
      </List>
    </>
  );
}
