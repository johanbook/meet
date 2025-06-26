import { ReactElement } from "react";

import { Avatar } from "@mui/material";

export interface OrganizationAvatarProps {
  name?: string;
  src?: string;
}

export function OrganizationAvatar({
  name,
  src,
}: OrganizationAvatarProps): ReactElement {
  if (src) {
    return (
      <Avatar
        slotProps={{
          img: { loading: "lazy" },
        }}
        src={src}
      />
    );
  }

  if (name) {
    return <Avatar>{name.slice(0, 1)}</Avatar>;
  }

  return <Avatar />;
}
