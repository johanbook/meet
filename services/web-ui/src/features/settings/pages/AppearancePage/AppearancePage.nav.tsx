import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface AppearancePageNavProps {
  children: ReactNode;
}

export function AppearancePageNav({
  children,
}: AppearancePageNavProps): ReactElement {
  const { t } = useTranslation("settings");

  const appBarContent = (
    <>
      <IconButton
        component={ReactRouterLink}
        sx={{
          mr: 2,
        }}
        to="/profile"
      >
        <ArrowBack />
      </IconButton>

      <Typography variant="h5">{t("header")}</Typography>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ pt: 1, px: 3 }}>{children}</Box>
    </Nav>
  );
}
