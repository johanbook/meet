import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import { profileApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ProfilePageComponent } from "./ProfilePage.component";
import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): ReactElement {
  const { id } = useParams();

  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.CurrentProfile, id],
    queryFn: () => profileApi.getProfile({ id: Number(id) }),
  });

  if (error) {
    return (
      <>
        <ProfilePageHeader />
        <ErrorView error={error} />
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <ProfilePageHeader />
        <ProfilePageSkeleton />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <ProfilePageHeader />

        <Typography>Nothing found</Typography>
      </>
    );
  }

  return (
    <>
      <ProfilePageHeader />

      <ProfilePageComponent profile={data} />
    </>
  );
}
