import React from "react";

export interface AuthenticationGuardNavProps {
  children: React.ReactNode;
}

export function AuthenticationGuardNav({
  children,
}: AuthenticationGuardNavProps): React.ReactElement {
  return <>{children}</>;
}
