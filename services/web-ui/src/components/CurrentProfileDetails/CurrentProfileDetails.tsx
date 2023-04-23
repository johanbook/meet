import React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { ProfileDetails } from "src/api";

import { CurrentProfileAvatar } from "../CurrentProfileAvatar";

export interface CurrentProfileDetailsProps {
  onUpdateProfile: (profileDetails: Partial<ProfileDetails>) => void;
  profile: ProfileDetails;
  refetchData: () => void;
}

export function CurrentProfileDetails({
  onUpdateProfile,
  profile,
  refetchData,
}: CurrentProfileDetailsProps): React.ReactElement {
  const [description, setDescription] = React.useState(profile.description);

  let imageUrl: string | undefined;

  if (profile.photos.length > 0) {
    imageUrl = profile.photos[0].imageUrl;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    onUpdateProfile({ description });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 1,
          justifyContent: "center",
        }}
      >
        <CurrentProfileAvatar
          onUploadedNewProfilePhoto={refetchData}
          src={imageUrl}
        />

        <Typography sx={{ paddingTop: 1 }} variant="h5">
          {profile.name}
        </Typography>
      </Box>

      <form>
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          multiline
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe yourself in a few words"
          rows={4}
          value={description}
        />

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={handleSubmit} type="submit" variant="outlined">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
