import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";

interface ChatPageNavProps {
  children: ReactNode;
}

export function ChatPageNav({ children }: ChatPageNavProps): ReactElement {
  return (
    <Nav navBackTo="/chat">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: 3,
          pt: 1,
        }}
      >
        {children}
      </Box>
    </Nav>
  );
}
