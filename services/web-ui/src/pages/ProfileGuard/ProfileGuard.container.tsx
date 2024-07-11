import { ReactElement, ReactNode } from "react";

import { profileApi } from "src/apis";
import { useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { ProfileCreationPage } from "../ProfileCreationPage";
import { ProfileGuardNav } from "./ProfileGuard.nav";
import { ProfileGuardSkeleton } from "./ProfileGuard.skeleton";

interface ProfileGuardContainerProps {
  children: ReactNode;
}

export function ProfileGuardContainer({
  children,
}: ProfileGuardContainerProps): ReactElement {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ["currentProfileExists"],
    queryFn: () => profileApi.checkIfProfileExists(),
  });

  if (error) {
    return (
      <ProfileGuardNav>
        <ErrorView
          message="Unable to verify profile"
          description="We cannot verify your profile right now. Try waiting a bit and refreshing the page."
        />
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
