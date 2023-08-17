import React from "react";

import { Delete } from "@mui/icons-material";
import {
  Card,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { ProfilePhotoDetails } from "src/api";
import { useSnackbar } from "src/core/snackbar";

export interface ProfilePhotoComponentProps {
  onRefresh: () => void;
  photo?: ProfilePhotoDetails;
  title: string;
}

export function ProfilePhotoComponent({
  onRefresh,
  photo,
  title,
}: ProfilePhotoComponentProps): React.ReactElement {
  const snackbar = useSnackbar();

  async function handleDelete(): Promise<void> {
    // await mutation.mutateAsync({ id: photo.id });

    onRefresh();

    snackbar.success("Photo removed");
  }

  return (
    <ImageListItem component={Card} variant="outlined">
      <img alt="Profile" src={photo?.url} />
      <ImageListItemBar
        actionIcon={
          <IconButton onClick={handleDelete} sx={{ color: "white" }}>
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
