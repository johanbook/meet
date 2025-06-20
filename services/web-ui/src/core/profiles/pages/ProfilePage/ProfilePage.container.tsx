import { ReactElement } from "react";
import { useParams } from "react-router";

import { Typography } from "@mui/material";

import { profileApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ProfilePageComponent } from "./ProfilePage.component";
import { ProfilePageNav } from "./ProfilePage.nav";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): ReactElement {
  const { id } = useParams();

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.CurrentProfile, id],
    queryFn: () => profileApi.getProfile({ id: Number(id) }),
  });

  if (error) {
    return (
      <ProfilePageNav>
        <ErrorView />
      </ProfilePageNav>
    );
  }

  if (isPending) {
    return (
      <ProfilePageNav>
        <ProfilePageSkeleton />
      </ProfilePageNav>
    );
  }

  if (!data) {
    return (
      <ProfilePageNav>
        <Typography>Nothing found</Typography>
      </ProfilePageNav>
    );
  }

  return (
    <ProfilePageNav>
      <ProfilePageComponent profile={data} />
    </ProfilePageNav>
  );
}
