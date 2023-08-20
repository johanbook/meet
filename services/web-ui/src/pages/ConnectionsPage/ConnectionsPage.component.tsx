import React from "react";

import { List } from "@mui/material";

import { ConnectionDetails } from "src/api";

import { ConnectionListItem } from "./components/ConnectionListItem";

export interface ConnectionsPageComponentProps {
  data: ConnectionDetails[];
}

export function ConnectionsPageComponent({
  data,
}: ConnectionsPageComponentProps): React.ReactElement {
  return (
    <>
      <List>
        {data.map((match, index) => (
          <ConnectionListItem
            divider={index < data.length - 1}
            key={match.profileId}
            data={match}
          />
        ))}
      </List>
    </>
  );
}
