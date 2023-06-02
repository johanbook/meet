import React from "react";
import { useQuery } from "react-query";

import { ResponseError } from "src/api";
import { profileApi } from "src/apis";

import { ErrorPage } from "../ErrorPage";
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

  if (error instanceof ResponseError && error.response.status === 401) {
    window.location.href = "/login";

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
        <ErrorPage error={error} message={message} />
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
