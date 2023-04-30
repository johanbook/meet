/* eslint-disable no-console */
import React from "react";
import { useQuery } from "react-query";

import { profileApi } from "src/apis";
import { NoProfilesFound } from "src/components/NoProfilesFound";
import { SwipeableProfiles } from "src/components/SwipeableProfiles";
import { ErrorMessage } from "src/components/ui/ErrorMessage";

import { SwipingPageHeader } from "./SwipingPageHeader";
import { SwipingPageSkeleton } from "./SwipingPageSkeleton";

export function SwipingPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("nearbyProfiles", () =>
    profileApi.getProfilesNearby()
  );

  if (error) {
    const message = (error as Error).message;
    return (
      <>
        <SwipingPageHeader />
        <ErrorMessage message={message} />
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
