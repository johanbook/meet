import React from "react";

import { Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useQuery } from "src/core/query";
import { ErrorPage } from "src/pages/ErrorPage";

import { ConnectionsPageComponent } from "./ConnectionsPage.component";
import { ConnectionsPageNav } from "./ConnectionsPage.nav";
import { ConnectionsPageSkeleton } from "./ConnectionsPage.skeleton";

export function ConnectionsPageContainer(): React.ReactElement {
  const { t } = useTranslation("connections");

  const { error, data, isLoading } = useQuery("matches", () =>
    chatsApi.getConnections()
  );

  if (error) {
    return (
      <ConnectionsPageNav>
        <ErrorPage error={error} />
      </ConnectionsPageNav>
    );
  }

  if (isLoading) {
    return (
      <ConnectionsPageNav>
        <ConnectionsPageSkeleton />
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
      <ConnectionsPageComponent data={data} />
    </ConnectionsPageNav>
  );
}
