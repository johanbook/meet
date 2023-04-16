import React from "react";

import { Button, TextField, Typography } from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";

export interface ProfileCreatorProps {
  onCreateProfile: (profileDetails: CreateProfileCommand) => void;
}

export function ProfileCreator({
  onCreateProfile,
}: ProfileCreatorProps): React.ReactElement {
  const { coordinates } = useCurrentLocation();
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    const lat = coordinates?.latitude || 0;
    const lon = coordinates?.longitude || 0;
    onCreateProfile({ description, name, recentLocation: { lat, lon } });
  }

  return (
    <>
      <Typography>
        Welcome to APP. Let's start by creating a profile.
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          value={name}
        />

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

        <Button onClick={handleSubmit} type="submit" variant="contained">
          Create
        </Button>
      </form>
    </>
  );
}
