import React from "react";
import { useMutation } from "react-query";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

import { photosApi } from "src/apis";
import { useSnackbar } from "src/core/snackbar";

const HEIGHT = 120;

export interface CurrentProfileAvatarProps {
  onUploadedNewProfilePhoto: () => void;
  src?: string;
}

export function CurrentProfileAvatar({
  onUploadedNewProfilePhoto,
  src,
}: CurrentProfileAvatarProps): React.ReactElement {
  const mutation = useMutation(() => photosApi.addPhoto());
  const { success } = useSnackbar();

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    // TODO: Upload file
    await mutation.mutateAsync();

    onUploadedNewProfilePhoto();

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
