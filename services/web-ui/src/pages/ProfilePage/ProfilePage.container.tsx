import React from "react";
import { useQuery } from "react-query";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { ProfileCreator } from "src/components/ProfileCreator";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { ProfilePageHeader } from "./ProfilePage.header";
import { ProfilePageSkeleton } from "./ProfilePage.skeleton";

async function handleCreateProfile(createProfileCommand: CreateProfileCommand) {
  await profileApi.createCurrentProfile({
    createProfileCommand,
  });
}

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

        <ProfileCreator onCreateProfile={handleCreateProfile} />
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
