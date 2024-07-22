import { ReactNode } from "react";

import { Box } from "@mui/material";

interface ProfileGuardNavProps {
  children: ReactNode;
}

export function ProfileGuardNav({
  children,
}: ProfileGuardNavProps): React.ReactElement {
  return <Box sx={{ height: "100vh", px: 3 }}>{children}</Box>;
}
