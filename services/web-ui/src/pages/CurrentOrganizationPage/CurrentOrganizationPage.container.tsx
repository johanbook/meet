import React from "react";

import { Typography } from "@mui/material";

import { organizationsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { CurrentOrganizationPageNav } from "./CurrentOrganizationPage.nav";
import { CurrentOrganizationPageSkeleton } from "./CurrentOrganizationPage.skeleton";
import { OrganizationMembers } from "./components/OrganizationMembers";

export function CurrentOrganizationPageContainer(): React.ReactElement {
  const { t } = useTranslation("organization");

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.CurrentOrganization,
    () => organizationsApi.getCurrentOrganization()
  );

  if (error) {
    return (
      <CurrentOrganizationPageNav>
        <ErrorPage error={error} />
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
        <ErrorPage error={new Error("Organization not found")} />
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
