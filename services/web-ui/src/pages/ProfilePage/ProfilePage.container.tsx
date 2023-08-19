import React from "react";

import { profileApi } from "src/apis";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { ProfileCreator } from "src/components/ProfileCreator";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): React.ReactElement {
  const { error, data, isLoading, refetch } = useQuery(
    CacheKeysConstants.CurrentProfile,
    () => profileApi.getCurrentProfile()
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

        <ProfileCreator onCreateProfile={refetch} />
      </>
    );
  }

  return (
    <>
      <ProfilePageHeader />

      <CurrentProfileDetails profile={data} refetchData={refetch} />
    </>
  );
}
