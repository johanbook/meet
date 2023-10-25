import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps): ReactElement {
  return <Box sx={{ paddingTop: 2 }}>{children}</Box>;
}
