import { ReactElement } from "react";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

import { profileApi } from "src/apis";
import { useTranslation } from "src/core/i18n";
import { useMutation, useQueryClient } from "src/core/query";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

const HEIGHT = 200;

export interface CurrentProfileAvatarProps {
  src?: string;
}

export function CurrentProfileAvatar({
  src,
}: CurrentProfileAvatarProps): ReactElement {
  const { t } = useTranslation("profile");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (photo: File) =>
      profileApi.updateCurrentProfilePhoto({ photo }),
  });

  const snackbar = useSnackbar();

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
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
          queryKey: [CacheKeysConstants.CurrentProfile],
        });
      },
    });
  }

  if (src) {
    return (
      <Button component="label" disabled={mutation.isPending}>
        <Avatar sx={{ height: HEIGHT, width: HEIGHT }} src={src} />
        <input hidden accept="image/*" type="file" onChange={handleUpload} />
      </Button>
    );
  }

  return (
    <Button component="label" disabled={mutation.isPending}>
      <Avatar sx={{ height: HEIGHT, width: HEIGHT }}>
        <AccountCircle sx={{ height: HEIGHT, width: HEIGHT }} />
      </Avatar>
      <input hidden accept="image/*" type="file" onChange={handleUpload} />
    </Button>
  );
}
