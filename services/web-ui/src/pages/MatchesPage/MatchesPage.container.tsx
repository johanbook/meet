import React from "react";
import { useQuery } from "react-query";

import { List, Typography } from "@mui/material";

import { matchesApi } from "src/apis";
import { MatchListItem } from "src/components/MatchListitem";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { MatchesPageHeader } from "./MatchesPage.header";
import { MatchesPageSkeleton } from "./MatchesPage.skeleton";
import { MatchesPageNewMatches } from "./components/MatchesPageNewMatches";

export function MatchesPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("allChats", () =>
    matchesApi.getMatches()
  );

  if (error) {
    const message = (error as Error).message;
    return (
      <>
        <MatchesPageHeader />
        <ErrorMessage message={message} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <MatchesPageHeader />
        <MatchesPageSkeleton />
      </>
    );
  }

  if (!data || (data.notTalkedTo.length === 0 && data.talkedTo.length === 0)) {
    return (
      <>
        <MatchesPageHeader />

        <Typography gutterBottom variant="h6">
          You do not have any matches yet
        </Typography>
        <Typography>Keep on swiping to get your first match</Typography>
      </>
    );
  }

  return (
    <>
      <MatchesPageHeader />

      <MatchesPageNewMatches matches={data.notTalkedTo} />

      <List>
        {data.talkedTo.map((match) => (
          <MatchListItem key={match.profileId} data={match} />
        ))}
      </List>
    </>
  );
}
