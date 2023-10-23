import { ReactElement } from "react";

import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

import { OrganizationMemberDetails } from "src/api";
import { Menu } from "src/components/ui/Menu";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";

import { OrganizationMemberRemoveDialog } from "../OrganizationMemberRemoveDialog/OrganizationMemberRemoveDialog";
import { OrganizationMemberUpdateDialog } from "../OrganizationMemberUpdateDialog/OrganizationMemberUpdateDialog";

export interface OrganizationMemberMenuProps {
  member: OrganizationMemberDetails;
}

export function OrganizationMemberMenu({
  member,
}: OrganizationMemberMenuProps): ReactElement {
  const authorization = useAuthorization();
  const { t } = useTranslation("organization");

  const { openDialog } = useDialog();

  function handleOpenEditDialog(): void {
    openDialog(OrganizationMemberUpdateDialog, { member });
  }

  function handleOpenRemoveDialog(): void {
    openDialog(OrganizationMemberRemoveDialog, { member });
  }

  if (authorization.error || authorization.isLoading) {
    return <> </>;
  }

  if (!authorization.hasPermission(Permissions.Membership.Edit)) {
    return <> </>;
  }

  return (
    <Menu
      Button={({ onClick }) => (
        <IconButton onClick={onClick}>
          <MoreVert />
        </IconButton>
      )}
    >
      <MenuItem onClick={handleOpenEditDialog}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText>{t("members.menu.edit")}</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleOpenRemoveDialog}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText>{t("members.menu.remove")}</ListItemText>
      </MenuItem>
    </Menu>
  );
}
