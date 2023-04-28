import React from "react";
import { useMutation } from "react-query";

import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { PhotoDetails, PhotosApi } from "src/api";
import { useSnackbar } from "src/hooks/useSnackbar";

const photosApi = new PhotosApi();

function getPhotoLabel(index: number): string {
  if (index === 0) {
    return "Main";
  }

  return String(index + 1);
}

export interface ProfilePhotosEditorProps {
  onUploadedNewProfilePhoto: () => void;
  photos: PhotoDetails[];
}

export function ProfilePhotosEditor({
  onUploadedNewProfilePhoto,
  photos,
}: ProfilePhotosEditorProps): React.ReactElement {
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
    <>
      <ImageList cols={3} gap={10} sx={{ height: "50vh" }}>
        {photos.map((photo, index) => (
          <ImageListItem
            component={Card}
            key={photo.imageUrl}
            variant="outlined"
          >
            <img alt="Profile" src={photo.imageUrl} />
            <ImageListItemBar
              title={getPhotoLabel(index)}
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
            />
          </ImageListItem>
        ))}

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="outlined"
        >
          <Button
            component="label"
            disabled={mutation.isLoading}
            sx={{ height: "100%", width: "100%" }}
          >
            <Add />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleUpload}
            />
          </Button>
        </Card>
      </ImageList>
    </>
  );
}
