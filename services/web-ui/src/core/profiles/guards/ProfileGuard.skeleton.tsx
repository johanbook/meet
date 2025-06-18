import { ReactElement } from "react";

import { LoadingView } from "src/views/LoadingView";

export function ProfileGuardSkeleton(): ReactElement {
  return <LoadingView />;
}
