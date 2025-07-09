import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";

interface ChatPageNavProps {
  children: ReactNode;
}

export function ChatPageNav({ children }: ChatPageNavProps): ReactElement {
  return (
    <Nav navBackTo="/chat" padding="normal">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Nav>
  );
}
