import React from "react";

import { Add } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

import { ProfilePhotoDetails } from "src/api";

import { ProfilePhotoComponent } from "./ProfilePhoto.component";

export interface ProfilePhotosEditorComponentProps {
  disabled: boolean;
  getPhotoLabel: (index: number) => string;
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  photo?: ProfilePhotoDetails;
}

export function ProfilePhotosEditorComponent({
  disabled,
  handleUpload,
  onRefresh,
  photo,
}: ProfilePhotosEditorComponentProps): React.ReactElement {
  return (
    <>
      <ProfilePhotoComponent onRefresh={onRefresh} photo={photo} title={"hi"} />

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
          <input hidden accept="image/*" type="file" onChange={handleUpload} />
        </Button>
      </Card>
    </>
  );
}
