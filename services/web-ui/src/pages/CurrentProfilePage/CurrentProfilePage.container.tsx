import { ReactElement } from "react";

import { profileApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";
import { SettingsPage } from "src/pages/SettingsPage";
import { ErrorView } from "src/views/ErrorView";

import { CurrentProfilePageNav } from "./CurrentProfilePage.nav";
import { CurrentProfilePageSkeleton } from "./CurrentProfilePage.skeleton";
import { CurrentProfileDetails } from "./components/CurrentProfileDetails";

export function CurrentProfilePageContainer(): ReactElement {
  const { error, data, isPending } = useQuery({
    queryKey: [CacheKeysConstants.CurrentProfile],
    queryFn: () => profileApi.getCurrentProfile(),
  });

  if (error) {
    return (
      <CurrentProfilePageNav>
        <ErrorView error={error} />
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
        <ErrorView error="Unable to fetch profile" />
      </CurrentProfilePageNav>
    );
  }

  return (
    <CurrentProfilePageNav>
      <CurrentProfileDetails profile={data} />
      <SettingsPage />
    </CurrentProfilePageNav>
  );
}
