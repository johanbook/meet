import { ReactElement } from "react";

import {
  OrganizationMemberDetails,
  RemoveMemberFromCurrentOrganizationRequest,
} from "src/api";
import { organizationsApi } from "src/apis";
import { ConfirmationDialog } from "src/components/ui";
import { GlobalDialogProps } from "src/core/dialog/dialog.context";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export interface OrganizationMemberRemoveDialogProps extends GlobalDialogProps {
  member: OrganizationMemberDetails;
}

export function OrganizationMemberRemoveDialog({
  member,
  ...props
}: OrganizationMemberRemoveDialogProps): ReactElement {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const { t } = useTranslation("organization");

  const mutation = useMutation({
    mutationFn: (request: RemoveMemberFromCurrentOrganizationRequest) =>
      organizationsApi.removeMemberFromCurrentOrganization(request),
  });

  function handleSave(onSuccess: () => void): void {
    mutation.mutate(
      { membershipId: member.id },
      {
        onError: () => snackbar.error(t("members.remove.error")),
        onSuccess: () => {
          snackbar.success(t("members.remove.success"));
          queryClient.invalidateQueries({
            queryKey: [CacheKeysConstants.CurrentOrganizationMembers],
          });
          onSuccess();
        },
      }
    );
  }

  return (
    <ConfirmationDialog
      description={t("members.remove.description")}
      onConfirm={handleSave}
      title={t("members.remove.header")}
      {...props}
    />
  );
}
