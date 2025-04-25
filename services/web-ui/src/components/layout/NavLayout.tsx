import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Link as MuiLink, Typography } from "@mui/material";

interface NavLayoutProps {
  children: ReactNode;
  header?: string | null;
  linkText: string;
  to: string;
}

export function NavLayout(
  { children, header, linkText, to }: NavLayoutProps
): ReactElement {
  return (
    <Box sx={{ pt: 1, px: 3 }}>
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
    </Box>
  );
}
