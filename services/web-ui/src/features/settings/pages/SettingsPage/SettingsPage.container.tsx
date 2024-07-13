import { ReactElement } from "react";

import { profileApi } from "src/apis";
import { Button, ConfirmationDialog, Typography } from "src/components/ui";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { SettingsPageNav } from "./SettingsPage.nav";

export function SettingsPageContainer(): ReactElement {
  const { t } = useTranslation("settings");
  const { openDialog } = useDialog();
  const snackbar = useSnackbar();

  const deleteAccountMutation = useMutation({
    onError: () => snackbar.success(t("danger-zone.delete-account.success")),
    onSuccess: () => snackbar.error(t("danger-zone.delete-account.error")),
    mutationFn: () => profileApi.deleteCurrentProfile(),
  });

  function handleClickDelete() {
    openDialog(ConfirmationDialog, {
      description: t("danger-zone.delete-account.description"),
      onConfirm: async (onClose) => {
        await deleteAccountMutation.mutateAsync();
        onClose();
      },
      title: t("danger-zone.delete-account.title"),
    });
  }

  return (
    <SettingsPageNav>
      <Typography gutterBottom sx={{ paddingTop: 3 }} variant="h6">
        {t("danger-zone.header")}
      </Typography>

      <Typography color="textSecondary" sx={{ pb: 2 }}>
        {t("danger-zone.description")}
      </Typography>

      <div>
        <Button
          color="error"
          loading={deleteAccountMutation.isPending}
          onClick={handleClickDelete}
          variant="contained"
        >
          {t("danger-zone.delete-account.button")}
        </Button>
      </div>
    </SettingsPageNav>
  );
}
