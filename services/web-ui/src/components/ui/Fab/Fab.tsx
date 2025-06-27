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
          // background: (theme) =>
          //   `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.error.main} 40%, ${theme.palette.secondary.main} 100%)`,
          borderRadius: 4,
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
