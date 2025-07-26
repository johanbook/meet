import { ReactElement } from "react";

import { profileApi } from "src/apis";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";

import { CurrentProfilePageNav } from "./CurrentProfilePage.nav";
import { CurrentProfilePageSkeleton } from "./CurrentProfilePage.skeleton";
import { CurrentProfileDetails } from "./components/CurrentProfileDetails";

export function CurrentProfilePageContainer(): ReactElement {
  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeyEnum.CurrentProfile],
    queryFn: () => profileApi.getCurrentProfile(),
  });

  if (error) {
    return (
      <CurrentProfilePageNav>
        <ErrorView />
      </CurrentProfilePageNav>
    );
  }

  if (isPending) {
    return (
      <CurrentProfilePageNav>
        <CurrentProfilePageSkeleton />
      </CurrentProfilePageNav>
    );
  }

  if (!data) {
    return (
      <CurrentProfilePageNav>
        <ErrorView message="Unable to fetch profile" />
      </CurrentProfilePageNav>
    );
  }

  return (
    <CurrentProfilePageNav>
      <CurrentProfileDetails profile={data} />
    </CurrentProfilePageNav>
  );
}
