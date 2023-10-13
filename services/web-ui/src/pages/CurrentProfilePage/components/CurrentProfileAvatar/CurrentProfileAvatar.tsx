import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

import { profileApi } from "src/apis";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

const HEIGHT = 200;

export interface CurrentProfileAvatarProps {
  src?: string;
}

export function CurrentProfileAvatar({
  src,
}: CurrentProfileAvatarProps): React.ReactElement {
  const queryClient = useQueryClient();
  const mutation = useMutation((photo: File) =>
    profileApi.updateCurrentProfilePhoto({ photo })
  );
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
      onError: () =>
        snackbar.error("There was an error when uploading the photo"),
      onSuccess: () => {
        snackbar.success("Photo uploaded successfully");
        queryClient.invalidateQueries(CacheKeysConstants.CurrentProfile);
      },
    });
  }

  if (src) {
    return (
      <Button component="label" disabled={mutation.isLoading}>
        <Avatar sx={{ height: HEIGHT, width: HEIGHT }} src={src} />
        <input hidden accept="image/*" type="file" onChange={handleUpload} />
      </Button>
    );
  }

  return (
    <Button component="label" disabled={mutation.isLoading}>
      <Avatar sx={{ height: HEIGHT, width: HEIGHT }}>
        <AccountCircle sx={{ height: HEIGHT, width: HEIGHT }} />
      </Avatar>
      <input hidden accept="image/*" type="file" onChange={handleUpload} />
    </Button>
  );
}
