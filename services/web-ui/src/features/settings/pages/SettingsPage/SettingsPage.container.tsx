import { ReactElement } from "react";

import { profileApi } from "src/apis";
import { Button, ConfirmationDialog, Typography } from "src/components/ui";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { useLogger } from "src/core/logging";
import { useMutation } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { registerServiceWorker } from "src/registerServiceWorker";

import { SettingsPageNav } from "./SettingsPage.nav";

export function SettingsPageContainer(): ReactElement {
  const logger = useLogger(SettingsPageNav.name);
  const { t } = useTranslation("settings");
  const { openDialog } = useDialog();
  const snackbar = useSnackbar();

  const deleteAccountMutation = useMutation({
    onError: (error) => {
      logger.error("Failed to delete account", { error });
      snackbar.error(t("danger-zone.delete-account.error"));
    },
    onSuccess: () => snackbar.success(t("danger-zone.delete-account.success")),
    mutationFn: () => profileApi.deleteCurrentProfile(),
  });

  const enableNotificationsMutation = useMutation({
    onError: (error) => {
      logger.error("Failed to enable notifications", { error });
      snackbar.error(t("notifications.enable.error"));
    },
    onSuccess: () => snackbar.success(t("notifications.enable.success")),
    mutationFn: async () => {
      await Notification.requestPermission();
      await registerServiceWorker();
    },
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
      <Typography gutterBottom variant="h6">
        {t("notifications.header")}
      </Typography>

      <Typography color="textSecondary" sx={{ pb: 2 }}>
        {t("notifications.enable.description")}
      </Typography>

      <Button
        color="inherit"
        loading={enableNotificationsMutation.isPending}
        onClick={() => enableNotificationsMutation.mutate()}
        variant="outlined"
      >
        {t("notifications.enable.button")}
      </Button>

      <Typography gutterBottom sx={{ paddingTop: 3 }} variant="h6">
        {t("danger-zone.header")}
      </Typography>

      <Typography color="textSecondary" sx={{ pb: 2 }}>
        {t("danger-zone.description")}
      </Typography>

      <Button
        color="error"
        loading={deleteAccountMutation.isPending}
        onClick={handleClickDelete}
        variant="contained"
      >
        {t("danger-zone.delete-account.button")}
      </Button>
    </SettingsPageNav>
  );
}
