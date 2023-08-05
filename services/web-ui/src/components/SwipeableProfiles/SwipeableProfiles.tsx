import React from "react";
import { useMutation } from "react-query";

import { ProfileDetails, SwipeCommand } from "src/api";
import { matchesApi } from "src/apis";
import { useSnackbar } from "src/core/snackbar";

import { SwipeableProfileDetails } from "../SwipeableProfileDetails";
import { SwipeableList } from "../ui/SwipeableList/SwipeableList";

export interface SwipeableProfilesProps {
  profiles: ProfileDetails[];
}

export function SwipeableProfiles({
  profiles,
}: SwipeableProfilesProps): React.ReactElement {
  const snackbar = useSnackbar();

  const mutation = useMutation(
    (swipeCommand: SwipeCommand) => matchesApi.swipe({ swipeCommand }),
    {
      onError: () =>
        snackbar.error("Unable to register swipe. Try refreshing the page"),
    }
  );

  async function handleSwipeLeft(shownProfileId: number): Promise<void> {
    await mutation.mutateAsync({ shownProfileId, liked: false });
  }

  async function handleSwipeRight(shownProfileId: number): Promise<void> {
    await mutation.mutateAsync({
      shownProfileId,
      liked: true,
    });
  }

  return (
    <SwipeableList
      data={profiles}
      getItemId={(profile) => profile.id}
      onSwipeLeft={(profile) => handleSwipeLeft(profile.id)}
      onSwipeRight={(profile) => handleSwipeRight(profile.id)}
      onRequestData={async () => []}
    >
      {(props) => <SwipeableProfileDetails {...props} />}
    </SwipeableList>
  );
}
