import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

interface CurrentProfilePageNavProps {
  children: ReactNode;
}

export function CurrentProfilePageNav({
  children,
}: CurrentProfilePageNavProps): ReactElement {
  return <Box sx={{ pt: 2 }}>{children}</Box>;
}
