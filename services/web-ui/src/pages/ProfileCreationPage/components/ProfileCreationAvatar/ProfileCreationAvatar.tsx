import { ReactElement } from "react";

import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";

const HEIGHT = 120;

export interface ProfileCreationAvatarProps {
  onChange: (photo: File) => void;
  src?: string;
}

export function ProfileCreationAvatar({
  onChange,
  src,
}: ProfileCreationAvatarProps): ReactElement {
  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    onChange(files[0]);
  }

  if (src) {
    return (
      <Button component="label">
        <Avatar sx={{ height: HEIGHT, width: HEIGHT }} src={src} />
        <input hidden accept="image/*" type="file" onChange={handleUpload} />
      </Button>
    );
  }

  return (
    <Button component="label">
      <Avatar sx={{ height: HEIGHT, width: HEIGHT }}>
        <AccountCircle sx={{ height: HEIGHT, width: HEIGHT }} />
      </Avatar>
      <input hidden accept="image/*" type="file" onChange={handleUpload} />
    </Button>
  );
}
