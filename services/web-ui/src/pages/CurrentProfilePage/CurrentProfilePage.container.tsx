import React from "react";

import { profileApi } from "src/apis";
import { CurrentProfileDetails } from "src/components/CurrentProfileDetails";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { ErrorPage } from "../ErrorPage";
import { SettingsPage } from "../SettingsPage";
import { CurrentProfilePageNav } from "./CurrentProfilePage.nav";
import { CurrentProfilePageSkeleton } from "./CurrentProfilePage.skeleton";

export function CurrentProfilePageContainer(): React.ReactElement {
  const { error, data, isLoading, refetch } = useQuery(
    CacheKeysConstants.CurrentProfile,
    () => profileApi.getCurrentProfile()
  );

  if (error) {
    return (
      <CurrentProfilePageNav>
        <ErrorPage error={error} />
      </CurrentProfilePageNav>
    );
  }

  if (isLoading) {
    return (
      <CurrentProfilePageNav>
        <CurrentProfilePageSkeleton />
      </CurrentProfilePageNav>
    );
  }

  if (!data) {
    return (
      <CurrentProfilePageNav>
        <ErrorPage error="Unable to fetch profile" />
      </CurrentProfilePageNav>
    );
  }

  return (
    <CurrentProfilePageNav>
      <CurrentProfileDetails profile={data} refetchData={refetch} />
      <SettingsPage />
    </CurrentProfilePageNav>
  );
}
