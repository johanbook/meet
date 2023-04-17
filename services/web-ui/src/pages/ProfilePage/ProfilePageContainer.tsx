import React from "react";
import { useQuery } from "react-query";

import {
  CreateProfileCommand,
  ProfileApi,
  UpdateProfileCommand,
} from "src/api";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { ProfileCreator } from "src/components/ProfileCreator";
import ErrorMessage from "src/components/ui/ErrorMessage";

import { ProfilePageHeader } from "./ProfilePageHeader";
import { ProfilePageSkeleton } from "./ProfilePageSkeleton";

const profileApi = new ProfileApi();

async function handleCreateProfile(createProfileCommand: CreateProfileCommand) {
  await profileApi.createCurrentProfile({
    createProfileCommand,
  });
}

export default function ProfilePageContainer(): React.ReactElement {
  const { error, data, isLoading, refetch } = useQuery("currentProfile", () =>
    profileApi.getCurrentProfile()
  );

  async function handleUpdateProfile(
    updateProfileCommand: UpdateProfileCommand
  ): Promise<void> {
    await profileApi.updateCurrentProfile({
      updateProfileCommand,
    });
    await refetch();
  }

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

      <CurrentProfileDetails
        onUpdateProfile={handleUpdateProfile}
        profile={data}
      />
    </>
  );
}
