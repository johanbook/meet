import React from "react";
import { useQuery } from "react-query";

import { Typography } from "@mui/material";

import { matchesApi } from "src/apis";

import { MatchesPageDataView } from "./views/MatchesPageData.view";
import { MatchesPageErrorView } from "./views/MatchesPageError.view";
import { MatchesPageLoadingView } from "./views/MatchesPageLoading.view";

export function MatchesPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("allChats", () =>
    matchesApi.getMatches()
  );

  if (error) {
    return <MatchesPageErrorView error={error as Error} />;
  }

  if (isLoading) {
    return (
      <>
        <MatchesPageLoadingView />
      </>
    );
  }

  if (!data || (data.notTalkedTo.length === 0 && data.talkedTo.length === 0)) {
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
      <MatchesPageDataView data={data} />
    </>
  );
}
