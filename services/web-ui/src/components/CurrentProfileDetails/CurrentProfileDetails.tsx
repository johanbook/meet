import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import { Box, Button, TextField, Typography } from "@mui/material";

import { ProfileDetails, UpdateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { useSnackbar } from "src/core/snackbar";

import { ProfilePhotosEditor } from "../ProfilePhotosEditor";

export interface CurrentProfileDetailsProps {
  profile: ProfileDetails;
  refetchData: () => void;
}

export function CurrentProfileDetails({
  profile,
  refetchData,
}: CurrentProfileDetailsProps): React.ReactElement {
  const { t } = useTranslation();
  const mutation = useMutation((updateProfileCommand: UpdateProfileCommand) =>
    profileApi.updateCurrentProfile({ updateProfileCommand })
  );

  const [description, setDescription] = React.useState(profile.description);
  const snackbar = useSnackbar();

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();

    await mutation.mutateAsync({ description });

    refetchData();

    snackbar.success(t("profile-editor.update.success"));
  }

  const canSubmit = description !== profile.description && !mutation.isLoading;

  return (
    <>
      <Typography sx={{ paddingTop: 2 }} variant="h5">
        {t("profile-editor.media")}
      </Typography>

      <ProfilePhotosEditor onRefresh={refetchData} photos={profile.photos} />

      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("profile-editor.description.title")}
      </Typography>

      <form>
        <TextField
          fullWidth
          disabled={mutation.isLoading}
          label={t("profile-editor.description.label")}
          margin="normal"
          multiline
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t("profile-edtir.description.placeholder") ?? undefined}
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
            {t("general.save")}
          </Button>
        </Box>
      </form>
    </>
  );
}
