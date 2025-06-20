import { ReactElement, SyntheticEvent } from "react";

import { Box } from "@mui/material";

import { CurrentOrganizationDetails, UpdateOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Button, TextField, Typography } from "src/components/ui";
import { ErrorMessage } from "src/components/ui/ErrorMessage";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useForm } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import {
  CacheKeysConstants,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

interface OrganizationSettingsProps {
  data: CurrentOrganizationDetails;
}

export function OrganizationSettings({
  data,
}: OrganizationSettingsProps): ReactElement {
  const { t } = useTranslation("organization");
  const authorization = useAuthorization();

  const snackbar = useSnackbar();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updateOrganizationCommand: UpdateOrganizationCommand) =>
      organizationsApi.updateCurrentOrganization({ updateOrganizationCommand }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => organizationsApi.deleteCurrentOrganization(),
  });

  const form = useForm<UpdateOrganizationCommand>({ name: data.name });

  if (authorization.error) {
    return <ErrorMessage error={authorization.error} />;
  }

  if (
    authorization.isLoading ||
    !authorization.hasPermission(Permissions.Organization.Edit)
  ) {
    return <></>;
  }

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    const { data } = form.validate();

    await mutation.mutateAsync(data, {
      onError: () => snackbar.error(t("settings.save.error")),
      onSuccess: () => {
        snackbar.success(t("settings.save.success"));
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.CurrentOrganization],
        });
      },
    });
  }

  async function handleDelete(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    await deleteMutation.mutateAsync(undefined, {
      onError: () => snackbar.error(t("settings.save.error")),
      onSuccess: () => {
        snackbar.success(t("settings.save.success"));
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.CurrentOrganization],
        });
      },
    });
  }

  return (
    <>
      <Typography sx={{ pt: 3, pb: 1 }} variant="h6">
        {t("settings.header")}
      </Typography>

      <Typography color="textSecondary">{t("settings.description")}</Typography>

      <TextField
        disabled={mutation.isPending}
        fullWidth
        label={t("settings.name")}
        maxLength={128}
        onChange={(name) => form.setValue({ name })}
        sx={{ mt: 2 }}
        value={form.state.name.value}
      />

      <Box sx={{ pt: 2, display: "flex" }}>
        <Button
          disabled={form.state.name.value === data.name}
          onClick={handleSubmit}
          variant="contained"
        >
          {t("settings.save.button")}
        </Button>
      </Box>

      <Typography sx={{ pt: 3, pb: 1 }} variant="h6">
        {t("settings.delete.header")}
      </Typography>

      <Button
        color="error"
        disabled={deleteMutation.isPending}
        onClick={handleDelete}
        variant="contained"
      >
        {t("settings.delete.button")}
      </Button>
    </>
  );
}
