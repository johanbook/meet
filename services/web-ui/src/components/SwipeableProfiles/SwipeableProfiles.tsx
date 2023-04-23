import React from "react";

import { ProfileDetails } from "src/api";

import { SwipeableProfileDetails } from "../SwipeableProfileDetails";
import { SwipeableList } from "../ui/SwipeableList/SwipeableList";

export interface SwipeableProfilesProps {
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  profiles: ProfileDetails[];
}

export function SwipeableProfiles({
  onAccept,
  onDecline,
  profiles,
}: SwipeableProfilesProps): React.ReactElement {
  return (
    <SwipeableList
      data={profiles}
      getItemId={(profile) => profile.id}
      onSwipeLeft={(profile) => onDecline(profile.id)}
      onSwipeRight={(profile) => onAccept(profile.id)}
      onRequestData={async () => []}
    >
      {(props) => <SwipeableProfileDetails {...props} />}
    </SwipeableList>
  );
}
