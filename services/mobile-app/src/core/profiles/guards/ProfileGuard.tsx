import { ReactNode } from "react";
import { Platform } from "react-native";
import { usePathname } from "expo-router";

import { profileApi } from "src/apis";
import { hasSession } from "src/core/authentication/session";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ProfileCreationPage } from "src/core/profiles/pages/ProfileCreationPage";
import { ErrorView } from "src/views/ErrorView";
import { LoadingView } from "src/views/LoadingView";

interface ProfileGuardProps {
  children: ReactNode;
}

export function ProfileGuard({ children }: ProfileGuardProps) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname.startsWith("/verify-email");

  // Mirrors the authentication guard: on native with an empty session the
  // auth guard is already redirecting to login, so no probe should run.
  const noSessionOnNative = Platform.OS !== "web" && !hasSession();

  const query = useQuery({
    queryKey: [CacheKeyEnum.CurrentProfileExists],
    queryFn: () => profileApi.checkIfProfileExists(),
    enabled: !noSessionOnNative,
  });

  if (isAuthPage || noSessionOnNative) {
    return <>{children}</>;
  }

  if (query.error) {
    return (
      <ErrorView
        description="We cannot verify your profile right now. Try waiting a bit and refreshing the page."
        message="Unable to verify profile"
      />
    );
  }

  if (query.isLoading) {
    return <LoadingView />;
  }

  if (!query.data) {
    return <ProfileCreationPage onProfileCreated={query.refetch} />;
  }

  return <>{children}</>;
}