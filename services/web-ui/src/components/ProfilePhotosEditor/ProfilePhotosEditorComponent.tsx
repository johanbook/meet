import React from "react";

import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { PhotoDetails } from "src/api";

export interface ProfilePhotosEditorComponentProps {
  disabled: boolean;
  getPhotoLabel: (index: number) => string;
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photos: PhotoDetails[];
}

export function ProfilePhotosEditorComponent({
  disabled,
  getPhotoLabel,
  handleUpload,
  photos,
}: ProfilePhotosEditorComponentProps): React.ReactElement {
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
