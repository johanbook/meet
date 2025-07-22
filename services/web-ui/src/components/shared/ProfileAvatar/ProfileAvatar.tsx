import { ReactElement } from "react";

import { Avatar } from "@mui/material";

export interface ProfileAvatarProps {
  name?: string;
  size?: number;
  src?: string;
}

export function ProfileAvatar({
  name,
  size,
  src,
}: ProfileAvatarProps): ReactElement {
  if (src) {
    return (
      <Avatar
        slotProps={{
          img: { loading: "lazy" },
        }}
        src={src}
        sx={{ width: size, height: size }}
      />
    );
  }

  if (name) {
    return (
      <Avatar sx={{ width: size, height: size }}>
        {name.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  }

  return <Avatar sx={{ width: size, height: size }} />;
}
