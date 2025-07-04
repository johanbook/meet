import { ReactElement } from "react";

import { IconButton } from "@mui/material";

import { organizationsApi } from "src/apis";
import { OrganizationAvatar } from "src/components/shared";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

export interface CurrentOrganizationAvatarProps {
  name?: string;
  src?: string;
  size: number;
}

export function CurrentOrganizationAvatar({
  name,
  src,
  size,
}: CurrentOrganizationAvatarProps): ReactElement {
  const { t } = useTranslation("organization");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (photo: File) =>
      organizationsApi.updateCurrentOrganizationPhoto({ photo }),
  });

  const snackbar = useSnackbar();

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    await mutation.mutateAsync(files[0], {
      onError: () => snackbar.error(t("actions.update-photo.error")),
      onSuccess: () => {
        snackbar.success(t("actions.update-photo.success"));
        queryClient.invalidateQueries({
          queryKey: [CacheKeysConstants.CurrentOrganization],
        });
      },
    });
  }

  return (
    <IconButton component="label" disabled={mutation.isPending}>
      <OrganizationAvatar name={name} src={src} size={size} />
      <input hidden accept="image/*" type="file" onChange={handleUpload} />
    </IconButton>
  );
}
