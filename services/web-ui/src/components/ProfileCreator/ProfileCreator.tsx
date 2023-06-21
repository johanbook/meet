import React from "react";
import { useMutation } from "react-query";

import { Box, Button, TextField, Typography } from "@mui/material";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { config } from "src/config";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { useSnackbar } from "src/hooks/useSnackbar";

import { Center } from "../ui/Center";

export interface ProfileCreatorProps {
  onCreateProfile: () => void;
}

export function ProfileCreator({
  onCreateProfile,
}: ProfileCreatorProps): React.ReactElement {
  const { coordinates } = useCurrentLocation();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    (createProfileCommand: CreateProfileCommand) =>
      profileApi.createCurrentProfile({ createProfileCommand }),
    { onError: () => snackbar.error("Unable to create profile") }
  );

  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  const canCreateProfile = name && description && !mutation.isLoading;

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();

    const lat = coordinates?.latitude || 0;
    const lon = coordinates?.longitude || 0;

    await mutation.mutateAsync({
      dateOfBirth: new Date(),
      description,
      name,
      recentLocation: { lat, lon },
    });

    onCreateProfile();
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
          disabled={mutation.isLoading}
          fullWidth
          label="Name"
          margin="normal"
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          value={name}
        />

        <TextField
          disabled={mutation.isLoading}
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
