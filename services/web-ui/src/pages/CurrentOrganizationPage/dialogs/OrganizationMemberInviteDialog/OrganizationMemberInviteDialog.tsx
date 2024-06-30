import { ReactElement } from "react";

import { AddMemberToOrganizationViaEmailCommand } from "src/api";
import { organizationsApi } from "src/apis";
import { Button, TextField, Typography } from "src/components/ui";
import { Dialog } from "src/components/ui/Dialog";
import { Permissions, useAuthorization } from "src/core/authorization";
import { GlobalDialogProps } from "src/core/dialog";
import { useForm, validators } from "src/core/forms";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export interface OrganizationMemberInviteDialogProps
  extends GlobalDialogProps {}

export function OrganizationMemberInviteDialog(): ReactElement {
  const authorization = useAuthorization();
  const { t } = useTranslation("organization");
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const mutation = useMutation({
    mutationFn: (
      addMemberToOrganizationViaEmailCommand: AddMemberToOrganizationViaEmailCommand
    ) =>
      organizationsApi.addMemberToOrganizationViaEmail({
        addMemberToOrganizationViaEmailCommand,
      }),
  });

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

  function handleSubmit(onSuccess: () => void): void {
    const { data, isValid } = form.validate();

    if (!isValid) {
      return;
    }

    mutation.mutate(data, {
      onError: () => snackbar.error(t("members.invite.submit.error")),
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.CurrentOrganizationMembers],
        });
        snackbar.success(t("members.invite.submit.success"));
        onSuccess();
      },
    });
  }

  return (
    <Dialog
      Actions={({ closeDialog }) => (
        <>
          <Button onClick={closeDialog}>{t("members.update.cancel")}</Button>

          <Button
            disabled={!form.isValid}
            onClick={() => handleSubmit(closeDialog)}
            sx={{ whiteSpace: "nowrap" }}
            type="submit"
            variant="outlined"
          >
            {t("members.invite.submit.button")}
          </Button>
        </>
      )}
      title={t("members.invite.header") || ""}
    >
      <Typography color="textSecondary" sx={{ paddingBottom: 3 }}>
        {t("members.invite.description")}
      </Typography>

      <TextField
        error={form.state.email.error}
        fullWidth
        label={t("members.invite.email.label")}
        onBlur={() => form.validate(["email"])}
        onChange={(email) => form.setValue({ email })}
        value={form.state.email.value}
      />
    </Dialog>
  );
}
