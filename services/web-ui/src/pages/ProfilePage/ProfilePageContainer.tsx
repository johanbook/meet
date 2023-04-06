import { CurrentProfileDetails } from "components/CurrentProfileDetails";
import { ProfileCreator } from "components/ProfileCreator";
import ErrorMessage from "components/ui/ErrorMessage";
import React from "react";
import { useQuery } from "react-query";

import {
  CreateProfileCommand,
  ProfileApi,
  UpdateProfileCommand,
} from "../../api";
import { ProfilePageHeader } from "./ProfilePageHeader";
import { ProfilePageSkeleton } from "./ProfilePageSkeleton";

const profileApi = new ProfileApi();

async function handleCreateProfile(createProfileCommand: CreateProfileCommand) {
  await profileApi.profileControllerCreateCurrentProfile({
    createProfileCommand,
  });
}

async function handleUpdateProfile(
  updateProfileCommand: UpdateProfileCommand
): Promise<void> {
  await profileApi.profileControllerUpdateCurrentProfile({
    updateProfileCommand,
  });
}

export default function ProfilePageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("currentProfile", () =>
    profileApi.profileControllerGetCurrentProfile()
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

      <CurrentProfileDetails
        onUpdateProfile={handleUpdateProfile}
        profile={data}
      />
    </>
  );
}
