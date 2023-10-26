import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Link as MuiLink, Typography } from "@mui/material";

interface PageWithNavProps {
  children: ReactNode;
  header?: string | null;
  linkText: string;
  to: string;
}

export function PageWithNav({
  children,
  header,
  linkText,
  to,
}: PageWithNavProps): ReactElement {
  return (
    <>
      <MuiLink
        component={ReactRouterLink}
        sx={{
          display: "Flex",
          alignItems: "center",
          paddingBottom: 2,
          paddingTop: 1,
        }}
        to={to}
        underline="hover"
      >
        <ArrowBackIosNew fontSize="small" sx={{ paddingRight: 1 / 2 }} />
        <span>{linkText}</span>
      </MuiLink>

      {header && (
        <Typography gutterBottom variant="h5">
          {header}
        </Typography>
      )}

      {children}
    </>
  );
}
