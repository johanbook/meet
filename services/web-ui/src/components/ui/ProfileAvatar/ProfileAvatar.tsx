import { ReactElement } from "react";

import { Avatar } from "@mui/material";

export interface ProfileAvatarProps {
  name?: string;
  src?: string;
}

export function ProfileAvatar({ name, src }: ProfileAvatarProps): ReactElement {
  if (src) {
    return <Avatar imgProps={{ loading: "lazy" }} src={src} />;
  }

  if (name) {
    return <Avatar>{name.slice(0, 1)}</Avatar>;
  }

  return <Avatar />;
}
