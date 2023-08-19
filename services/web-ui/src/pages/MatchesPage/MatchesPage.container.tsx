import React from "react";

import { Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { useQuery } from "src/core/query";
import { ErrorPage } from "src/pages/ErrorPage";

import { MatchesPageComponent } from "./MatchesPage.component";
import { MatchesPageSkeleton } from "./MatchesPage.skeleton";

export function MatchesPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("matches", () =>
    chatsApi.getConnections()
  );

  if (error) {
    return <ErrorPage error={error as Error} />;
  }

  if (isLoading) {
    return (
      <>
        <MatchesPageSkeleton />
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <Typography gutterBottom variant="h6">
          You have no open conversations yet
        </Typography>
        <Typography>Try writing something to someone</Typography>
      </>
    );
  }

  return (
    <>
      <MatchesPageComponent data={data} />
    </>
  );
}
