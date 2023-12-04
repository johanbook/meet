import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { chatsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ConnectionsPageComponent } from "./ConnectionsPage.component";
import { ConnectionsPageNav } from "./ConnectionsPage.nav";
import { ConnectionsPageSkeleton } from "./ConnectionsPage.skeleton";

export function ConnectionsPageContainer(): ReactElement {
  const { t } = useTranslation("connections");

  const { error, data, isPending } = useQuery({
    queryKey: ["matches"],
    queryFn: () => chatsApi.getConnections(),
  });

  if (error) {
    return (
      <ConnectionsPageNav>
        <ErrorView error={error} />
      </ConnectionsPageNav>
    );
  }

  if (isPending) {
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
