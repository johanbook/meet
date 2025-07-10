import { ReactElement, SyntheticEvent } from "react";
import { useNavigate } from "react-router";

import { Box } from "@mui/material";

import { CreateOrganizationCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Nav } from "src/components/nav";
import { Button, TextField, Typography } from "src/components/ui";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import {
  CacheKeysConstants,
  useMutation,
  useQueryClient,
} from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export function CreateOrganizationPageContainer(): ReactElement {
  const { t } = useTranslation("organization.creation");
  const mutation = useMutation({
    mutationFn: (createOrganizationCommand: CreateOrganizationCommand) =>
      organizationsApi.createOrganization({ createOrganizationCommand }),
  });
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<CreateOrganizationCommand>(
    {
      name: "",
    },
    { name: validators.required() },
    { localStorageKey: "create-organization" },
  );

  function handleCancel(): void {
    form.reset();
    navigate("/profile");
  }

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
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.OrganizationList],
        });
        navigate("/group/list");
      },
    });
  }

  return (
    <Nav navBackTo="/profile" padding="normal" title={t("header")}>
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
          required
          sx={{ marginBottom: 2 }}
          value={form.state.name.value}
        />

        <Box sx={{ gap: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleCancel} variant="outlined">
            {t("actions.cancel.button")}
          </Button>

          <Button
            disabled={!form.isValid}
            loading={mutation.isPending}
            type="submit"
            variant="contained"
          >
            {t("actions.submit.button")}
          </Button>
        </Box>
      </form>
    </Nav>
  );
}
