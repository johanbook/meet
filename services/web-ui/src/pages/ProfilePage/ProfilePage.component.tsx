import { ReactElement } from "react";

import { Typography } from "@mui/material";

import { ProfileDetails } from "src/api";
import { CurrentProfileAvatar } from "src/components/CurrentProfileAvatar";
import { Center } from "src/components/ui/Center";
import { useTranslation } from "src/core/i18n";

export interface ProfilePageComponentProps {
  profile: ProfileDetails;
}

export function ProfilePageComponent({
  profile,
}: ProfilePageComponentProps): ReactElement {
  const { t } = useTranslation("profile");

  return (
    <>
      <Center>
        <CurrentProfileAvatar src={profile.photo?.url} />
      </Center>

      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("description.title")}
      </Typography>

      <Typography>{profile.description}</Typography>
    </>
  );
}