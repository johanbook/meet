import { ReactElement } from "react";

import { LoadingView } from "src/views/LoadingView";

export function AuthenticationGuardSkeleton(): ReactElement {
  return <LoadingView />;
}
