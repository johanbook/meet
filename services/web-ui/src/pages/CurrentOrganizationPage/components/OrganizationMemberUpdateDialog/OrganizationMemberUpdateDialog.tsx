import { ReactElement, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Button, MenuItem, Select, Typography } from "@mui/material";

import { OrganizationMemberDetails, UpdateMemberRoleCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Dialog } from "src/components/ui/Dialog";
import { Role } from "src/core/authorization";
import { GlobalDialogProps } from "src/core/dialog/dialog.context";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export interface OrganizationMemberUpdateDialogProps extends GlobalDialogProps {
  member: OrganizationMemberDetails;
}

export function OrganizationMemberUpdateDialog({
  member,
}: OrganizationMemberUpdateDialogProps): ReactElement {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const { t } = useTranslation("organization");
  const [role, setRole] = useState<Role>(member.role);

  const mutation = useMutation(
    (updateMemberRoleCommand: UpdateMemberRoleCommand) =>
      organizationsApi.changeMemberRole({ updateMemberRoleCommand })
  );

  async function handleSave(onSuccess: () => void): Promise<void> {
    await mutation.mutateAsync(
      { id: member.id, role },
      {
        onError: () => snackbar.error(t("members.update.role.error")),
        onSuccess: () => {
          snackbar.success(t("members.update.role.success"));
          queryClient.invalidateQueries([
            CacheKeysConstants.CurrentOrganizationMembers,
          ]);
          onSuccess();
        },
      }
    );
  }

  return (
    <Dialog
      Actions={({ closeDialog }) => (
        <>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            disabled={role === member.role}
            onClick={() => handleSave(closeDialog)}
          >
            Save
          </Button>
        </>
      )}
      title={t("members.update.header") || ""}
    >
      <form>
        <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
          {t("members.update.text")}
        </Typography>

        <Select
          fullWidth
          label="Role"
          onChange={(event) => setRole(event.target.value as Role)}
          value={role}
        >
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
