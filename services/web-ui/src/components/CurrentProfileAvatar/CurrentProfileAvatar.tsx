import React from "react";
import { useMutation } from "react-query";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

import { profileApi } from "src/apis";
import { useSnackbar } from "src/core/snackbar";

const HEIGHT = 200;

export interface CurrentProfileAvatarProps {
  onUploadedNewProfilePhoto?: () => void;
  src?: string;
}

export function CurrentProfileAvatar({
  onUploadedNewProfilePhoto,
  src,
}: CurrentProfileAvatarProps): React.ReactElement {
  const mutation = useMutation((photo: File) =>
    profileApi.updateCurrentProfilePhoto({ photo })
  );
  const { success } = useSnackbar();

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    await mutation.mutateAsync(files[0]);

    if (onUploadedNewProfilePhoto) {
      onUploadedNewProfilePhoto();
    }

    success("Photo uploaded successfully");
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
