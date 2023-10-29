import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { organizationsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { CurrentOrganizationPageNav } from "./CurrentOrganizationPage.nav";
import { CurrentOrganizationPageSkeleton } from "./CurrentOrganizationPage.skeleton";
import { OrganizationMembers } from "./components/OrganizationMembers";

export function CurrentOrganizationPageContainer(): ReactElement {
  const { t } = useTranslation("organization");

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.CurrentOrganization,
    () => organizationsApi.getCurrentOrganization()
  );

  if (error) {
    return (
      <CurrentOrganizationPageNav>
        <ErrorView error={error} />
      </CurrentOrganizationPageNav>
    );
  }

  if (isLoading) {
    return (
      <CurrentOrganizationPageNav>
        <CurrentOrganizationPageSkeleton />
      </CurrentOrganizationPageNav>
    );
  }

  if (!data) {
    return (
      <CurrentOrganizationPageNav>
        <ErrorView error="Organization not found" />
      </CurrentOrganizationPageNav>
    );
  }

  return (
    <CurrentOrganizationPageNav>
      <Typography>
        {t("name")}: {data.name}
      </Typography>

      <OrganizationMembers />
    </CurrentOrganizationPageNav>
  );
}
