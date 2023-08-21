import React from "react";

import { ListItem, ListItemText } from "@mui/material";

import { organizationsApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDate } from "src/utils/time";

import { ErrorPage } from "../ErrorPage";
import { OrganizationListPageNav } from "./OrganizationListPage.nav";
import { OrganizationListPageSkeleton } from "./OrganizationListPage.skeleton";

export function OrganizationListPageContainer(): React.ReactElement {
  const { t } = useTranslation("organization-list");

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.OrganizationList,
    () => organizationsApi.getOrganizations()
  );

  if (error) {
    return (
      <OrganizationListPageNav>
        <ErrorPage error={error} />
      </OrganizationListPageNav>
    );
  }

  if (isLoading) {
    return (
      <OrganizationListPageNav>
        <OrganizationListPageSkeleton />
      </OrganizationListPageNav>
    );
  }

  if (!data || data.length === 0) {
    return (
      <OrganizationListPageNav>
        <ErrorPage error={t("organization-list.error")} />
      </OrganizationListPageNav>
    );
  }

  return (
    <OrganizationListPageNav>
      {data.map((organization) => (
        <ListItem key={organization.id}>
          <ListItemText
            primary={organization.name}
            secondary={getDate(organization.created)}
          />
        </ListItem>
      ))}
    </OrganizationListPageNav>
  );
}
