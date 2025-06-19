import { ReactElement, useState } from "react";

import { Button, MenuItem, Typography } from "@mui/material";

import { OrganizationMemberDetails, UpdateMemberRoleCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Select } from "src/components/ui";
import { Dialog } from "src/components/ui/Dialog";
import { Role } from "src/core/authorization";
import { GlobalDialogProps } from "src/core/dialog/dialog.context";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
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

  const mutation = useMutation({
    mutationFn: (updateMemberRoleCommand: UpdateMemberRoleCommand) =>
      organizationsApi.changeMemberRole({ updateMemberRoleCommand }),
  });

  async function handleSave(onSuccess: () => void): Promise<void> {
    await mutation.mutateAsync(
      { id: member.id, role },
      {
        onError: () => snackbar.error(t("members.update.role.error")),
        onSuccess: () => {
          snackbar.success(t("members.update.role.success"));
          queryClient.invalidateQueries({
            queryKey: [CacheKeysConstants.CurrentOrganizationMembers],
          });
          onSuccess();
        },
      },
    );
  }

  return (
    <Dialog
      Actions={({ closeDialog }) => (
        <>
          <Button onClick={closeDialog}>{t("members.update.cancel")}</Button>
          <Button
            disabled={role === member.role}
            onClick={() => handleSave(closeDialog)}
          >
            {t("members.update.save")}
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
          onChange={(role) => setRole(role as Role)}
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
