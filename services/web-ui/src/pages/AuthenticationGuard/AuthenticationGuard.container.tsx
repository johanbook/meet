import React from "react";
import { useQuery } from "react-query";

import { ResponseError } from "src/api";
import { profileApi } from "src/apis";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { AuthenticationGuardNav } from "./AuthenticationGuard.nav";
import { AuthenticationGuardSkeleton } from "./AuthenticationGuard.skeleton";

export interface AuthenticationGuardContainerProps {
  children: React.ReactNode;
}

export function AuthenticationGuardContainer({
  children,
}: AuthenticationGuardContainerProps): React.ReactElement {
  const { error, isLoading } = useQuery(
    "authentication",
    () => profileApi.checkIfFileExists(),
    { retry: false }
  );

  if (error instanceof ResponseError) {
    const status = error.response.status;

    if (status === 401) {
      window.location.href = "/login";
    }

    return (
      <AuthenticationGuardNav>
        <AuthenticationGuardSkeleton />
      </AuthenticationGuardNav>
    );
  }

  if (error) {
    const errorMessage = (error as Error).message;
    const message = `Please login. Try refreshing page.`;
    return (
      <AuthenticationGuardNav>
        <ErrorMessage debug={errorMessage} message={message} />
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
