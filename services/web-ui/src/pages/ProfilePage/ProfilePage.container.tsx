import React from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import { profileApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { ProfilePageComponent } from "./ProfilePage.component";
import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): React.ReactElement {
  const { id } = useParams();

  const { error, data, isLoading } = useQuery(
    [CacheKeysConstants.CurrentProfile, id],
    () => profileApi.getProfile({ id: Number(id) })
  );

  if (error) {
    return (
      <>
        <ProfilePageHeader />
        <ErrorPage error={error} />
      </>
    );
  }

  if (isLoading) {
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
