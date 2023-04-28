import React from "react";
import { useMutation } from "react-query";

import { PhotoDetails } from "src/api";
import { photosApi } from "src/apis";
import { useSnackbar } from "src/hooks/useSnackbar";

import { ProfilePhotosEditorComponent } from "./ProfilePhotosEditorComponent";

function getPhotoLabel(index: number): string {
  if (index === 0) {
    return "Main";
  }

  return String(index + 1);
}

export interface ProfilePhotosEditorContainerProps {
  onUploadedNewProfilePhoto: () => void;
  photos: PhotoDetails[];
}

export function ProfilePhotosEditorContainer({
  onUploadedNewProfilePhoto,
  photos,
}: ProfilePhotosEditorContainerProps): React.ReactElement {
  const snackbar = useSnackbar();

  const mutation = useMutation((file: File) => photosApi.addPhoto({ file }), {
    onError: () => snackbar.error("Image upload failed"),
  });

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      snackbar.error("File not found. Please contact app support.");
      return;
    }

    const file = files[0];
    await mutation.mutateAsync(file);

    onUploadedNewProfilePhoto();

    snackbar.success("Photo uploaded successfully");
  }

  return (
    <ProfilePhotosEditorComponent
      disabled={mutation.isLoading}
      getPhotoLabel={getPhotoLabel}
      handleUpload={handleUpload}
      photos={photos}
    />
  );
}
