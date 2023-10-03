import React from "react";

import { TextField, Typography } from "@mui/material";

import { ProfileDetails } from "src/api";
import { CurrentProfileAvatar } from "src/components/CurrentProfileAvatar";
import { Center } from "src/components/ui/Center";
import { useTranslation } from "src/core/i18n";

export interface ProfilePageComponentProps {
  profile: ProfileDetails;
}

export function ProfilePageComponent({
  profile,
}: ProfilePageComponentProps): React.ReactElement {
  const { t } = useTranslation("profile");

  const [description, setDescription] = React.useState(profile.description);

  return (
    <>
      <Center>
        <CurrentProfileAvatar src={profile.photo?.url} />
      </Center>

      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("description.title")}
      </Typography>

      <TextField
        fullWidth
        disabled
        label={t("description.label")}
        margin="normal"
        multiline
        onChange={(event) => setDescription(event.target.value)}
        placeholder={t("description.placeholder") ?? undefined}
        rows={4}
        value={description}
      />
    </>
  );
}
