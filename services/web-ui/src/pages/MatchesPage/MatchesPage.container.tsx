import React from "react";

import { Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useQuery } from "src/core/query";
import { ErrorPage } from "src/pages/ErrorPage";

import { ConnectionsPageNav } from "./ConnectionsPage.nav";
import { MatchesPageComponent } from "./MatchesPage.component";
import { MatchesPageSkeleton } from "./MatchesPage.skeleton";

export function MatchesPageContainer(): React.ReactElement {
  const { t } = useTranslation("connections");

  const { error, data, isLoading } = useQuery("matches", () =>
    chatsApi.getConnections()
  );

  if (error) {
    return (
      <ConnectionsPageNav>
        <ErrorPage error={error as Error} />
      </ConnectionsPageNav>
    );
  }

  if (isLoading) {
    return (
      <ConnectionsPageNav>
        <MatchesPageSkeleton />
      </ConnectionsPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ConnectionsPageNav>
        <Typography sx={{ paddingTop: 1 }} gutterBottom>
          {t("no-connections")}
        </Typography>
      </ConnectionsPageNav>
    );
  }

  return (
    <ConnectionsPageNav>
      <MatchesPageComponent data={data} />
    </ConnectionsPageNav>
  );
}
