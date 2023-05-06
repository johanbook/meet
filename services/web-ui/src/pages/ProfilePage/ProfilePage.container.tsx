import React from "react";
import { useQuery } from "react-query";

import { profileApi } from "src/apis";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { ProfileCreator } from "src/components/ProfileCreator";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

export function ProfilePageContainer(): React.ReactElement {
  const { error, data, isLoading, refetch } = useQuery("currentProfile", () =>
    profileApi.getCurrentProfile()
  );

  if (error) {
    const message = (error as Error).message;
    return (
      <>
        <ProfilePageHeader />
        <ErrorMessage message={message} />
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
