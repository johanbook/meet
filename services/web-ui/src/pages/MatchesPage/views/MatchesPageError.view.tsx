import React from "react";

import { ErrorPage } from "src/pages/ErrorPage";

export interface MatchesPageErrorViewProps {
  error: Error;
}

export function MatchesPageErrorView({
  error,
}: MatchesPageErrorViewProps): React.ReactElement {
  return <ErrorPage error={error} />;
}
