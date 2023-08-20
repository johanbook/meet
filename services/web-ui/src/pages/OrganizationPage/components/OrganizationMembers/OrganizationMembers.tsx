import React from "react";

import {
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

import { organizationsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";

export function OrganizationMembers(): React.ReactElement {
  const { t } = useTranslation("organization");

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.CurrentOrganizationMembers,
    () => organizationsApi.getCurrentOrganizationMembers()
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data || data.length === 0) {
    return <ErrorMessage error={t("members.error")} />;
  }

  return (
    <>
      <Typography sx={{ paddingTop: 2 }} variant="h6">
        {t("members.header")}
      </Typography>

      <List>
        {data.map((member) => (
          <ListItem key={member.profileId}>
            <ListItemText primary={member.profileId} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
