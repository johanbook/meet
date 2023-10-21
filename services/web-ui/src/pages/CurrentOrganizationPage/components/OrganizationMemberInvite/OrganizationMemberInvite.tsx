import { ReactElement, SyntheticEvent } from "react";

import { Box } from "@mui/material";

import { Button, TextField } from "src/components/ui";
import { Permissions, useAuthorization } from "src/core/authorization";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";

export interface OrganizationMemberInviteProps {}

export function OrganizationMemberInvite(): ReactElement {
  const authorization = useAuthorization();
  const { t } = useTranslation("organization");

  const form = useForm(
    { email: "" },
    {
      email: ({ email }) => validators.required(email),
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

    const { isValid } = form.validate();

    if (!isValid) {
      return;
    }
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
