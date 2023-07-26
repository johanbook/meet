import React from "react";
import { useQuery } from "react-query";

import { profileApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { ProfileCreationPage } from "../ProfileCreationPage";
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
    () => profileApi.checkIfProfileExists()
  );

  if (error) {
    const message = `Unable to verify if profile exists. Try refreshing page.`;
    return (
      <ProfileGuardNav>
        <ErrorMessage error={error} message={message} />
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
    return <ProfileCreationPage onProfileCreated={refetch} />;
  }

  return <>{children}</>;
}
