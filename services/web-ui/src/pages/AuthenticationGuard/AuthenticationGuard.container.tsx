import { ReactElement, ReactNode } from "react";

import { ResponseError } from "src/api";
import { profileApi } from "src/apis";
import { useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { AuthenticationGuardNav } from "./AuthenticationGuard.nav";
import { AuthenticationGuardSkeleton } from "./AuthenticationGuard.skeleton";

export interface AuthenticationGuardContainerProps {
  children: ReactNode;
}

export function AuthenticationGuardContainer({
  children,
}: AuthenticationGuardContainerProps): ReactElement {
  const { error, isLoading } = useQuery({
    queryKey: ["authentication"],
    queryFn: () => profileApi.checkIfProfileExists(),
    retry: false,
  });

  if (error instanceof ResponseError && error.response.status === 401) {
    window.location.href = `/login?redirectToPath=${window.location.pathname}`;

    return (
      <AuthenticationGuardNav>
        <AuthenticationGuardSkeleton />
      </AuthenticationGuardNav>
    );
  }

  if (error) {
    const message = `Unable to verify if logged in. Try refreshing the page.`;
    return (
      <AuthenticationGuardNav>
        <ErrorView error={error} message={message} />
      </AuthenticationGuardNav>
    );
  }

  if (isLoading) {
    return (
      <AuthenticationGuardNav>
        <AuthenticationGuardSkeleton />
      </AuthenticationGuardNav>
    );
  }

  return <>{children}</>;
}
