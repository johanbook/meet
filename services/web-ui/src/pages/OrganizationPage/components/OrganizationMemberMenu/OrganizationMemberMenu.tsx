import { ReactElement } from "react";

import { Edit, MoreVert } from "@mui/icons-material";
import { ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

import { Menu } from "src/components/ui/Menu";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";

import { OrganizationMemberUpdateDialog } from "../OrganizationMemberUpdateDialog/OrganizationMemberUpdateDialog";

export interface OrganizationMemberMenuProps {
  id: string;
}

export function OrganizationMemberMenu(): ReactElement {
  const authorization = useAuthorization();
  const { t } = useTranslation("organization");

  const { openDialog } = useDialog();

  function handleOpenEditDialog(): void {
    openDialog(OrganizationMemberUpdateDialog, {});
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
    </Menu>
  );
}
