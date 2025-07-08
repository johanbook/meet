import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { Fab as MuiFab, Zoom } from "@mui/material";

import { useIsMobile } from "src/hooks/useIsMobile";

interface FabProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
}

export function Fab({ children, onClick, to }: FabProps): ReactElement {
  const isMobile = useIsMobile();

  const sx = {
    borderRadius: 4,
    position: "absolute",
    // NB: We need to account for bottom navigation on mobile
    bottom: isMobile ? 70 : 10,
    right: 10,
  };

  if (to) {
    return (
      <Zoom in>
        <MuiFab
          component={ReactRouterLink}
          color="primary"
          onClick={onClick}
          sx={sx}
          to={to}
        >
          {children}
        </MuiFab>
      </Zoom>
    );
  }

  return (
    <Zoom in>
      <MuiFab color="primary" onClick={onClick} sx={sx}>
        {children}
      </MuiFab>
    </Zoom>
  );
}
