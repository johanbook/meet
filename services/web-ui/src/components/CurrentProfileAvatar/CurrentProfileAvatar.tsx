import React from "react";
import { useMutation } from "react-query";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

import { PhotosApi } from "src/api";
import { useSnackbar } from "src/hooks/useSnackbar";

const HEIGHT = 120;

const photosApi = new PhotosApi();

export interface CurrentProfileAvatarProps {
  onUploadedNewProfilePhoto: () => void;
  src?: string;
}

export function CurrentProfileAvatar({
  onUploadedNewProfilePhoto,
  src,
}: CurrentProfileAvatarProps): React.ReactElement {
  const mutation = useMutation((file: File) => photosApi.addPhoto({ file }));
  const { success } = useSnackbar();

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    await mutation.mutateAsync(file);

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
