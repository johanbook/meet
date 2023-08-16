import React from "react";
import { useMutation } from "react-query";

import { ProfilePhotoDetails } from "src/api";
import { profileApi } from "src/apis";
import { useSnackbar } from "src/core/snackbar";

import { ProfilePhotosEditorComponent } from "./ProfilePhotosEditor.component";

function getPhotoLabel(index: number): string {
  if (index === 0) {
    return "Main";
  }

  return String(index + 1);
}

export interface ProfilePhotosEditorContainerProps {
  onRefresh: () => void;
  photo?: ProfilePhotoDetails;
}

export function ProfilePhotosEditorContainer({
  onRefresh,
  photo,
}: ProfilePhotosEditorContainerProps): React.ReactElement {
  const snackbar = useSnackbar();

  const mutation = useMutation(
    () => profileApi.updateCurrentProfilePhoto({ photo: [new Blob([])] }),
    {
      onError: () => snackbar.error("Image upload failed"),
    }
  );

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      snackbar.error("File not found. Please contact app support.");
      return;
    }

    // TODO: Upload file
    await mutation.mutateAsync();

    onRefresh();

    snackbar.success("Photo uploaded successfully");
  }

  return (
    <ProfilePhotosEditorComponent
      disabled={mutation.isLoading}
      getPhotoLabel={getPhotoLabel}
      handleUpload={handleUpload}
      onRefresh={onRefresh}
      photo={photo}
    />
  );
}
