import { ProfileDetails } from "api";
import React from "react";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

export interface CurrentProfileDetailsProps {
  profile: ProfileDetails;
  onUpdateProfile: (profileDetails: Partial<ProfileDetails>) => void;
}

export function CurrentProfileDetails({
  profile,
  onUpdateProfile,
}: CurrentProfileDetailsProps): React.ReactElement {
  const [description, setDescription] = React.useState(profile.description);

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    onUpdateProfile({ description });
  }

  return (
    <>
      <Box sx={{ align: "center", paddingTop: 1 }}>
        <Avatar sx={{ height: 80, width: 80 }}>
          <AccountCircle />
        </Avatar>

        <Typography variant="h6">{profile.name}</Typography>
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

        <Box sx={{ align: "right" }}>
          <Button onClick={handleSubmit} type="submit" variant="outlined">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
