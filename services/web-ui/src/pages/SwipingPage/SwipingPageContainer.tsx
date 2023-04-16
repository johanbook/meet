import React from "react";
import { useQuery } from "react-query";

import { ProfileApi } from "src/api";
import { NoProfilesFound } from "src/components/NoProfilesFound";
import { SwipableProfileDetails } from "src/components/SwipableProfileDetails";
import ErrorMessage from "src/components/ui/ErrorMessage";

import { SwipingPageHeader } from "./SwipingPageHeader";
import { SwipingPageSkeleton } from "./SwipingPageSkeleton";

const profileApi = new ProfileApi();

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

      <SwipableProfileDetails
        onAccept={() => data.shift()}
        onDecline={() => data.shift()}
        profile={data[0]}
      />
    </>
  );
}
