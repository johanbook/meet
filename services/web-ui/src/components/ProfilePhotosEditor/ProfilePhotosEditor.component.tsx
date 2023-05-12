import React from "react";

import { Add } from "@mui/icons-material";
import { Button, Card, ImageList } from "@mui/material";

import { PhotoDetails } from "src/api";

import { ProfilePhotoComponent } from "./ProfilePhoto.component";

export interface ProfilePhotosEditorComponentProps {
  disabled: boolean;
  getPhotoLabel: (index: number) => string;
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  photos: PhotoDetails[];
}

export function ProfilePhotosEditorComponent({
  disabled,
  getPhotoLabel,
  handleUpload,
  onRefresh,
  photos,
}: ProfilePhotosEditorComponentProps): React.ReactElement {
  const numCols = Math.min(3, photos.length + 1);
  return (
    <>
      <ImageList cols={numCols} gap={10} sx={{ height: "50vh" }}>
        {photos.map((photo, index) => (
          <ProfilePhotoComponent
            key={photo.id}
            onRefresh={onRefresh}
            photo={photo}
            title={getPhotoLabel(index)}
          />
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
            disabled={disabled}
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
