import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { Fab as MuiFab, Zoom } from "@mui/material";

import { useIsMobile } from "src/hooks/useIsMobile";

interface FabProps {
  children: ReactNode;
  to: string;
}

export function Fab({ children, to }: FabProps): ReactElement {
  const isMobile = useIsMobile();

  return (
    <Zoom in>
      <MuiFab
        component={ReactRouterLink}
        color="primary"
        sx={{
          position: "absolute",
          // NB: We need to account for bottom navigation on mobile
          bottom: isMobile ? 70 : 10,
          right: 10,
        }}
        to={to}
      >
        {children}
      </MuiFab>
    </Zoom>
  );
}
