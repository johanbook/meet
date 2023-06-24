import React from "react";
import { useQuery } from "react-query";

import { profileApi } from "src/apis";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { ProfileCreator } from "src/components/ProfileCreator";

import { ErrorPage } from "../ErrorPage";
import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): React.ReactElement {
  const { error, data, isLoading, refetch } = useQuery("currentProfile", () =>
    profileApi.getCurrentProfile()
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
