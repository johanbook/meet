import React from "react";

import { Typography } from "@mui/material";

import { organizationsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { OrganizationPageNav } from "./OrganizationPage.nav";
import { OrganizationPageSkeleton } from "./OrganizationPage.skeleton";
import { OrganizationMembers } from "./components/OrganizationMembers";

export function OrganizationPageContainer(): React.ReactElement {
  const { t } = useTranslation("organization");

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.CurrentOrganization,
    () => organizationsApi.getCurrentOrganization()
  );

  if (error) {
    return (
      <OrganizationPageNav>
        <ErrorPage error={error} />
      </OrganizationPageNav>
    );
  }

  if (isLoading) {
    return (
      <OrganizationPageNav>
        <OrganizationPageSkeleton />
      </OrganizationPageNav>
    );
  }

  if (!data) {
    return (
      <OrganizationPageNav>
        <ErrorPage error={new Error("Organization not found")} />
      </OrganizationPageNav>
    );
  }

  return (
    <OrganizationPageNav>
      <Typography>
        {t("name")}: {data.name}
      </Typography>

      <OrganizationMembers />
    </OrganizationPageNav>
  );
}
