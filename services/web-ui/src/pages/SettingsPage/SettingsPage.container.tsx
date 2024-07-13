import { ReactElement } from "react";

import { Box, FormControlLabel, FormGroup } from "@mui/material";

import { SettingsDetails } from "src/api";
import { profileApi, settingsApi } from "src/apis";
import { Button, ConfirmationDialog, Typography } from "src/components/ui";
import { Switch } from "src/components/ui";
import { useDialog } from "src/core/dialog";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";
import { ErrorView } from "src/views/ErrorView";

import { SettingsPageNav } from "./SettingsPage.nav";
import { SettingsPageSkeleton } from "./SettingsPage.skeleton";

export function SettingsPageContainer(): ReactElement {
  const { t } = useTranslation("settings");
  const { openDialog } = useDialog();
  const snackbar = useSnackbar();

  const queryClient = useQueryClient();
  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.Settings],
    queryFn: () => settingsApi.getCurrentSettings(),
  });

  // TODO: Investigate why type is incorrect here
  const mutation = useMutation({
    mutationFn: (body: object) => settingsApi.updateCurrentSettings({ body }),
  });

  const deleteAccountMutation = useMutation({
    onError: () => snackbar.success(t("danger-zone.delete-account.success")),
    onSuccess: () => snackbar.error(t("danger-zone.delete-account.error")),
    mutationFn: () => profileApi.deleteCurrentProfile(),
  });

  if (error) {
    return (
      <SettingsPageNav>
        <ErrorView />
      </SettingsPageNav>
    );
  }

  if (isPending) {
    return (
      <SettingsPageNav>
        <SettingsPageSkeleton />
      </SettingsPageNav>
    );
  }

  if (!data) {
    return (
      <SettingsPageNav>
        <ErrorView message="Settings not found" />
      </SettingsPageNav>
    );
  }

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

  async function handleChange(settings: SettingsDetails): Promise<void> {
    await mutation.mutateAsync(settings, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.Settings],
        });
      },
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SettingsPageNav>
        <Box sx={{ flexGrow: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={(value) =>
                    handleChange({
                      ...data,
                      darkmode: value,
                    })
                  }
                  value={data.darkmode}
                />
              }
              disabled={isPending || mutation.isPending}
              label={t("darkmode")}
            />
          </FormGroup>
        </Box>

        <Typography gutterBottom sx={{ paddingTop: 3 }} variant="h5">
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
    </Box>
  );
}
