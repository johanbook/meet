import React from "react";
import { useQuery } from "react-query";

import { CreateProfileCommand } from "src/api";
import { profileApi } from "src/apis";
import { ProfileCreator } from "src/components/ProfileCreator";
import ErrorMessage from "src/components/ui/ErrorMessage";

import { ProfileGuardNav } from "./ProfileGuard.nav";
import { ProfileGuardSkeleton } from "./ProfileGuard.skeleton";

export interface ProfileGuardContainerProps {
  children: React.ReactNode;
}

export function ProfileGuardContainer({
  children,
}: ProfileGuardContainerProps): React.ReactElement {
  const { error, data, isLoading, refetch } = useQuery(
    "currentProfileExists",
    () => profileApi.checkIfFileExists()
  );

  async function handleCreateProfile(
    createProfileCommand: CreateProfileCommand
  ) {
    await profileApi.createCurrentProfile({
      createProfileCommand,
    });
    await refetch();
  }

  if (error) {
    const errorMessage = (error as Error).message;
    const message = `Unable to verify if profile exists. Try refreshing page.`;
    return (
      <ProfileGuardNav>
        <ErrorMessage debug={errorMessage} message={message} />
      </ProfileGuardNav>
    );
  }

  if (isLoading) {
    return (
      <ProfileGuardNav>
        <ProfileGuardSkeleton />
      </ProfileGuardNav>
    );
  }

  if (!data) {
    return (
      <ProfileGuardNav>
        <ProfileCreator onCreateProfile={handleCreateProfile} />
      </ProfileGuardNav>
    );
  }

  return <>{children}</>;
}
