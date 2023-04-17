import React from "react";
import { useQuery } from "react-query";

import { Box, Toolbar } from "@mui/material";

import { CreateProfileCommand, ProfileApi } from "src/api";
import { ProfileCreator } from "src/components/ProfileCreator";
import { AppBar } from "src/components/ui/AppBar";
import ErrorMessage from "src/components/ui/ErrorMessage";

import { ProfileGuardSkeleton } from "./ProfileGuardSkeleton";

const profileApi = new ProfileApi();

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
    const message = (error as Error).message;
    return (
      <>
        <ErrorMessage message={message} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ProfileGuardSkeleton />
      </>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar />
        <Box component="main" sx={{ flexGrow: 1, padding: 3, paddingTop: 1 }}>
          <Toolbar />
          <ProfileCreator onCreateProfile={handleCreateProfile} />
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
}
