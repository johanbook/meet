import React from "react";
import { useQuery } from "react-query";

import { profileApi } from "src/apis";
import { NoProfilesFound } from "src/components/NoProfilesFound";
import { SwipeableProfiles } from "src/components/SwipeableProfiles";

import { ErrorPage } from "../ErrorPage";
import { SwipingPageHeader } from "./SwipingPage.header";
import { SwipingPageSkeleton } from "./SwipingPage.skeleton";

export function SwipingPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("nearbyProfiles", () =>
    profileApi.getProfilesNearby()
  );

  if (error) {
    return (
      <>
        <SwipingPageHeader />
        <ErrorPage error={error} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <SwipingPageHeader />
        <SwipingPageSkeleton />
      </>
    );
  }

  if (!data || data.length === 0) {
    return <NoProfilesFound />;
  }

  return (
    <>
      <SwipingPageHeader />

      <SwipeableProfiles profiles={data} />
    </>
  );
}
