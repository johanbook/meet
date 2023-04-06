import { ProfileApi } from "api";
import { NoProfilesFound } from "components/NoProfilesFound";
import { SwipableProfileDetails } from "components/SwipableProfileDetails";
import ErrorMessage from "components/ui/ErrorMessage";
import React from "react";
import { useQuery } from "react-query";

import { SwipingPageHeader } from "./SwipingPageHeader";
import { SwipingPageSkeleton } from "./SwipingPageSkeleton";

const profileApi = new ProfileApi();

export function SwipingPageContainer(): React.ReactElement {
  const { error, data, isLoading } = useQuery("nearbyProfiles", () =>
    profileApi.profileControllerGetProfilesNearby()
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
