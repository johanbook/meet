import { ReactElement, SyntheticEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box } from "@mui/material";

import { AddMemberToOrganizationViaEmailCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Button, TextField } from "src/components/ui";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export interface OrganizationMemberInviteProps {}

export function OrganizationMemberInvite(): ReactElement {
  const authorization = useAuthorization();
  const { t } = useTranslation("organization");
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    (
      addMemberToOrganizationViaEmailCommand: AddMemberToOrganizationViaEmailCommand
    ) =>
      organizationsApi.addMemberToOrganizationViaEmail({
        addMemberToOrganizationViaEmailCommand,
      })
  );

  const form = useForm<AddMemberToOrganizationViaEmailCommand>(
    { email: "" },
    {
      email: validators.required(),
    }
  );

  if (authorization.error || authorization.isLoading) {
    return <> </>;
  }

  if (!authorization.hasPermission(Permissions.Membership.Invite)) {
    return <> </>;
  }

  function handleSubmit(event: SyntheticEvent): void {
    event.preventDefault();

    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data, {
      onError: () => snackbar.error(t("members.invite.submit.error")),
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries([
          CacheKeysConstants.CurrentOrganizationMembers,
        ]);
        snackbar.success(t("members.invite.submit.success"));
      },
    });
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ alignItems: "flex-start", display: "flex", gap: 1 }}
    >
      <TextField
        error={form.state.email.error}
        fullWidth
        label={t("members.invite.email.label")}
        onBlur={() => form.validate(["email"])}
        onChange={(email) => form.setValue({ email })}
        value={form.state.email.value}
      />

      <Button
        disabled={!form.isValid}
        sx={{ whiteSpace: "nowrap" }}
        type="submit"
        variant="outlined"
      >
        {t("members.invite.submit.button")}
      </Button>
    </Box>
  );
}
