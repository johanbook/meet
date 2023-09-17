import { ReactElement } from "react";

import { Button, MenuItem, Select, Typography } from "@mui/material";

import { OrganizationMemberDetails } from "src/api";
import { Dialog } from "src/components/ui/Dialog";
import { Role } from "src/core/authorization";
import { GlobalDialogProps } from "src/core/dialog/dialog.context";
import { useTranslation } from "src/core/i18n";

export interface OrganizationMemberUpdateDialogProps extends GlobalDialogProps {
  member: OrganizationMemberDetails;
}

export function OrganizationMemberUpdateDialog({
  member,
}: OrganizationMemberUpdateDialogProps): ReactElement {
  const { t } = useTranslation("organization");

  return (
    <Dialog
      Actions={({ closeDialog }) => (
        <>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button>Save</Button>
        </>
      )}
      title={t("members.update.header") || ""}
    >
      <form>
        <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
          {t("members.update.text")}
        </Typography>

        <Select fullWidth label="Role" value={member.role}>
          {Object.entries(Role).map(([name, value]) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </form>
    </Dialog>
  );
}
