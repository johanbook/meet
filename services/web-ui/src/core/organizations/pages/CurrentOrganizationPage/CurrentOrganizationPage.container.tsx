import { ReactElement } from "react";

import { Avatar, Box, Typography } from "@mui/material";

import { organizationsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDate } from "src/utils/time";
import { ErrorView } from "src/views/ErrorView";

import { CurrentOrganizationPageNav } from "./CurrentOrganizationPage.nav";
import { CurrentOrganizationPageSkeleton } from "./CurrentOrganizationPage.skeleton";
import { OrganizationMembers } from "./components/OrganizationMembers";
import { OrganizationSettings } from "./components/OrganizationSettings";

export function CurrentOrganizationPageContainer(): ReactElement {
  const { t } = useTranslation("organization");

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  if (error) {
    return (
      <CurrentOrganizationPageNav>
        <ErrorView />
      </CurrentOrganizationPageNav>
    );
  }

  if (isPending) {
    return (
      <CurrentOrganizationPageNav>
        <CurrentOrganizationPageSkeleton />
      </CurrentOrganizationPageNav>
    );
  }

  if (!data) {
    return (
      <CurrentOrganizationPageNav>
        <ErrorView message="Organization not found" />
      </CurrentOrganizationPageNav>
    );
  }

  return (
    <CurrentOrganizationPageNav>
      <Box sx={{ pt: 1, display: "flex", gap: 2, alignItems: "center" }}>
        <Box>
          <Avatar sx={{ width: 56, height: 56 }}>{data.name[0]}</Avatar>
        </Box>
        <Box>
          <Typography variant="h5">{data.name}</Typography>

          <Typography color="textSecondary">
            {t("created-at", { date: getDate(data.created) })}
          </Typography>
        </Box>
      </Box>

      <OrganizationMembers />

      <OrganizationSettings data={data} />
    </CurrentOrganizationPageNav>
  );
}
