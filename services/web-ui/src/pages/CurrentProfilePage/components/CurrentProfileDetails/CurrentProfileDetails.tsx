import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { Box, Button, TextField, Typography } from "@mui/material";

import { ProfileDetails, UpdateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { Center } from "src/components/ui/Center";
import { useTranslation } from "src/core/i18n";
import { CacheKeysConstants } from "src/core/query";
import { useSnackbar } from "src/core/snackbar";

import { CurrentProfileAvatar } from "../CurrentProfileAvatar";

export interface CurrentProfileDetailsProps {
  profile: ProfileDetails;
}

export function CurrentProfileDetails({
  profile,
}: CurrentProfileDetailsProps): React.ReactElement {
  const { t } = useTranslation("profile");
  const mutation = useMutation((updateProfileCommand: UpdateProfileCommand) =>
    profileApi.updateCurrentProfile({ updateProfileCommand })
  );

  const [description, setDescription] = React.useState(profile.description);

  const queryClient = useQueryClient();

  const snackbar = useSnackbar();

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();

    await mutation.mutateAsync(
      { description },
      {
        onError: () => snackbar.error(t("update.error")),
        onSuccess: () => {
          snackbar.success(t("update.success"));

          queryClient.invalidateQueries([CacheKeysConstants.CurrentProfile]);
        },
      }
    );
  }

  const canSubmit = description !== profile.description && !mutation.isLoading;

  return (
    <>
      <Center>
        <CurrentProfileAvatar src={profile.photo?.url} />
      </Center>

      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("description.title")}
      </Typography>

      <form>
        <TextField
          fullWidth
          disabled={mutation.isLoading}
          label={t("description.label")}
          margin="normal"
          multiline
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t("description.placeholder") ?? undefined}
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
            {t("save")}
          </Button>
        </Box>
      </form>
    </>
  );
}
