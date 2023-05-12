import React from "react";
import { useMutation } from "react-query";

import { Delete } from "@mui/icons-material";
import {
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { PhotoDetails, RemovePhotoCommand } from "src/api";
import { photosApi } from "src/apis";
import { useSnackbar } from "src/hooks/useSnackbar";

export interface ProfilePhotoComponentProps {
  onRefresh: () => void;
  photo: PhotoDetails;
  title: string;
}

export function ProfilePhotoComponent({
  onRefresh,
  photo,
  title,
}: ProfilePhotoComponentProps): React.ReactElement {
  const snackbar = useSnackbar();
  const mutation = useMutation(
    (removePhotoCommand: RemovePhotoCommand) =>
      photosApi.removePhoto({ removePhotoCommand }),
    { onError: () => snackbar.error("Failed to remove photo") }
  );

  async function handleDelete(): Promise<void> {
    await mutation.mutateAsync({ id: photo.id });

    onRefresh();

    snackbar.success("Photo removed");
  }

  return (
    <ImageListItem component={Card} key={photo.id} variant="outlined">
      <img alt="Profile" src={photo.imageUrl} />
      <ImageListItemBar
        actionIcon={
          <IconButton
            disabled={mutation.isLoading}
            onClick={handleDelete}
            sx={{ color: "white" }}
          >
            <Delete />
          </IconButton>
        }
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        }}
        title={title}
      />
    </ImageListItem>
  );
}
