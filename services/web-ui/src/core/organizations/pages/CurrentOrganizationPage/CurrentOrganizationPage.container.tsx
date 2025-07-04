import { ReactElement } from "react";

import { Box, Typography } from "@mui/material";

import { organizationsApi } from "src/apis";
import { OrganizationAvatar } from "src/components/shared";
import { useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDate } from "src/utils/time";
import { ErrorView } from "src/views/ErrorView";

import { CurrentOrganizationPageNav } from "./CurrentOrganizationPage.nav";
import { CurrentOrganizationPageSkeleton } from "./CurrentOrganizationPage.skeleton";
import { CurrentOrganizationAvatar } from "./components/CurrentOrganizationAvatar";
import { OrganizationMembers } from "./components/OrganizationMembers";
import { OrganizationSettings } from "./components/OrganizationSettings";

export function CurrentOrganizationPageContainer(): ReactElement {
  const { t } = useTranslation("organization");

  const authorization = useAuthorization();
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

  if (isPending || authorization.isLoading) {
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
          {authorization.role === "admin" ? (
            <CurrentOrganizationAvatar
              name={data.name}
              src={data.photo?.url}
              size={56}
            />
          ) : (
            <OrganizationAvatar
              name={data.name}
              src={data.photo?.url}
              size={56}
            />
          )}
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
