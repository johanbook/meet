import { ReactElement } from "react";

import { Avatar, Typography } from "@mui/material";

import { ProfileDetails } from "src/api";
import { Center } from "src/components/ui/Center";

export interface ProfilePageComponentProps {
  profile: ProfileDetails;
}

export function ProfilePageComponent({
  profile,
}: ProfilePageComponentProps): ReactElement {
  return (
    <>
      <Center>
        <Avatar src={profile.photo?.url} sx={{ height: 150, width: 150 }} />
      </Center>

      <Center>
        <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
          {profile.name}
        </Typography>
      </Center>

      <Center>
        <Typography>{profile.description}</Typography>
      </Center>
    </>
  );
}
