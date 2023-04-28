import React from "react";
import { useMutation } from "react-query";

import { Box, Button, TextField, Typography } from "@mui/material";

import { ProfileDetails, UpdateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { useSnackbar } from "src/hooks/useSnackbar";

import { CurrentProfileAvatar } from "../CurrentProfileAvatar";

export interface CurrentProfileDetailsProps {
  profile: ProfileDetails;
  refetchData: () => void;
}

export function CurrentProfileDetails({
  profile,
  refetchData,
}: CurrentProfileDetailsProps): React.ReactElement {
  const mutation = useMutation((updateProfileCommand: UpdateProfileCommand) =>
    profileApi.updateCurrentProfile({ updateProfileCommand })
  );

  const [description, setDescription] = React.useState(profile.description);
  const snackbar = useSnackbar();

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();

    await mutation.mutateAsync({ description });

    refetchData();

    snackbar.success("Updated profile");
  }

  const [profilePhoto] = profile.photos;
  const canSubmit = description !== profile.description && !mutation.isLoading;

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
          src={profilePhoto?.imageUrl}
        />

        <Typography sx={{ paddingTop: 1 }} variant="h5">
          {profile.name}
        </Typography>
      </Box>

      <form>
        <TextField
          fullWidth
          disabled={mutation.isLoading}
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
            disabled={!canSubmit}
            onClick={handleSubmit}
            type="submit"
            variant="outlined"
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
