import { ReactElement, SyntheticEvent } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

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
  const { t } = useTranslation("create-organization");
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
    { localStorageKey: "create-organization" }
  );

  function handleCancel(): void {
    form.reset();
    navigate("/profile");
  }

  async function handleSubmit(event: SyntheticEvent): Promise {
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

  const appBarContent = (
    <>
      <IconButton
        component={ReactRouterLink}
        sx={{
          mr: 2,
        }}
        to="/profile"
      >
        <ArrowBack />

        <Typography color="textPrimary" sx={{ pl: 3 }} variant="h5">
          {t("header")}
        </Typography>
      </IconButton>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ px: 2, pt: 2 }}>
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
      </Box>
    </Nav>
  );
}
