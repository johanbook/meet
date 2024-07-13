import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

interface CreateChatPageNavProps {
  children: ReactNode;
}

export function CreateChatPageNav({
  children,
}: CreateChatPageNavProps): ReactElement {
  return <Box sx={{ p: 2 }}>{children}</Box>;
}
