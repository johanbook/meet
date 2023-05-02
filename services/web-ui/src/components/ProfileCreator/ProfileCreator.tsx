import React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { config } from "src/config";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";

import { Center } from "../ui/Center";

export interface ProfileCreatorProps {
  onCreateProfile: (profileDetails: CreateProfileCommand) => void;
}

export function ProfileCreator({
  onCreateProfile,
}: ProfileCreatorProps): React.ReactElement {
  const { coordinates } = useCurrentLocation();
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  const canCreateProfile = name && description;

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    const lat = coordinates?.latitude || 0;
    const lon = coordinates?.longitude || 0;
    onCreateProfile({ description, name, recentLocation: { lat, lon } });
  }

  return (
    <>
      <Center>
        <Typography color="primary" gutterBottom variant="h5">
          Welcome to {config.APP.NAME}
        </Typography>
      </Center>

      <Typography>Let's start by creating a profile.</Typography>
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

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button
            disabled={!canCreateProfile}
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </form>
    </>
  );
}
