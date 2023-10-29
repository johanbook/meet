import { ReactElement } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

import { organizationsApi } from "src/apis";
import { Button } from "src/components/ui";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { getDate } from "src/utils/time";

import { OrganizationMemberInviteDialog } from "../../dialogs/OrganizationMemberInviteDialog";
import { OrganizationMemberMenu } from "../OrganizationMemberMenu";

export function OrganizationMembers(): ReactElement {
  const { t } = useTranslation("organization");
  const authorization = useAuthorization();
  const { openDialog } = useDialog();

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

  function handleOpenInviteDialog(): void {
    openDialog(OrganizationMemberInviteDialog, {});
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Typography sx={{ flexGrow: 1, paddingTop: 2 }} variant="h5">
          {t("members.header")}
        </Typography>

        {authorization.role === "admin" && (
          <Button onClick={handleOpenInviteDialog} variant="text">
            {t("members.invite.button")}
          </Button>
        )}
      </Box>

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
