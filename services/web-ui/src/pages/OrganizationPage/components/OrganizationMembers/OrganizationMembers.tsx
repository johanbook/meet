import React from "react";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

import { organizationsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { useAuthorization, Role } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDate } from "src/utils/time";

export function OrganizationMembers(): React.ReactElement {
  const { t } = useTranslation("organization");
  const { role } = useAuthorization();

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
      <Typography sx={{ paddingTop: 2 }} variant="h5">
        {t("members.header")}
      </Typography>

      <List>
        {data.map((member) => (
          <ListItem key={member.profileId}>
            <ListItemAvatar>
              <Avatar src={member.imageUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                role === Role.Admin
                  ? `${member.name} (${member.role})`
                  : member.name
              }
              secondary={
                t("members.member-since") + " " + getDate(member.joinedAt)
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
