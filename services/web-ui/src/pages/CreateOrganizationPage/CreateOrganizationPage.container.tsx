import { ReactElement, SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { CreateOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Button, TextField, Typography } from "src/components/ui";
import { useForm } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export function CreateOrganizationPageContainer(): ReactElement {
  const { t } = useTranslation("create-organization");
  const mutation = useMutation(
    (createOrganizationCommand: CreateOrganizationCommand) =>
      organizationsApi.createOrganization({ createOrganizationCommand })
  );
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<CreateOrganizationCommand>(
    {
      name: "",
    },
    { name: ({ name }) => (name ? false : "Required field") },
    { localStorageKey: "create-organization" }
  );

  async function handleSubmit(event: SyntheticEvent): Promise<void> {
    event.preventDefault();
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    await mutation.mutateAsync(data, {
      onError: () => snackbar.error(t("actions.submit.error")),
      onSuccess: () => {
        form.reset();
        snackbar.success(t("actions.submit.success"));
        queryClient.invalidateQueries([CacheKeysConstants.OrganizationList]);
        navigate("/group/list");
      },
    });
  }

  return (
    <>
      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>

      <Typography color="textSecondary" sx={{ paddingBottom: 3 }}>
        {t("description")}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          error={form.state.name.error || ""}
          fullWidth
          label={t("fields.name.label")}
          onBlur={() => form.validate()}
          onChange={(name) => form.setValue({ name })}
          sx={{ marginBottom: 2 }}
          value={form.state.name.value}
        />

        <Box sx={{ gap: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined">{t("actions.cancel.button")}</Button>

          <Button
            disabled={!form.isValid}
            loading={mutation.isLoading}
            type="submit"
            variant="contained"
          >
            {t("actions.submit.button")}
          </Button>
        </Box>
      </form>
    </>
  );
}
