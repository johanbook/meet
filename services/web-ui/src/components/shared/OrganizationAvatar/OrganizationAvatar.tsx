import { ReactElement } from "react";

import { Avatar } from "@mui/material";

export interface OrganizationAvatarProps {
  name?: string;
  src?: string;
  size: number;
}

export function OrganizationAvatar({
  name,
  src,
  size,
}: OrganizationAvatarProps): ReactElement {
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
      <Avatar sx={{ width: size, height: size }}>{name.slice(0, 1)}</Avatar>
    );
  }

  return <Avatar sx={{ width: size, height: size }} />;
}
