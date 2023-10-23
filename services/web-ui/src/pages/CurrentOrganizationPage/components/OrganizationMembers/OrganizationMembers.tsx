import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

import { organizationsApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDate } from "src/utils/time";

import { OrganizationMemberInvite } from "../OrganizationMemberInvite";
import { OrganizationMemberMenu } from "../OrganizationMemberMenu";

export function OrganizationMembers(): React.ReactElement {
  const { t } = useTranslation("organization");
  const authorization = useAuthorization();

  const { error, data, isLoading } = useQuery(
    CacheKeysConstants.CurrentOrganizationMembers,
    () => organizationsApi.getCurrentOrganizationMembers()
  );

  if (error || authorization.error) {
    return <ErrorMessage error={error || authorization.error} />;
  }

  if (isLoading || authorization.isLoading) {
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

      <OrganizationMemberInvite />

      <List>
        {data.map((member) => (
          <ListItem
            key={member.profileId}
            secondaryAction={<OrganizationMemberMenu member={member} />}
          >
            <ListItemButton
              component={Link}
              to={`/profile/${member.profileId}`}
            >
              <ListItemAvatar>
                <Avatar src={member.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  authorization.hasPermission(Permissions.Organization.ViewRole)
                    ? `${member.name} (${member.role})`
                    : member.name
                }
                secondary={
                  t("members.member-since") + " " + getDate(member.joinedAt)
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
