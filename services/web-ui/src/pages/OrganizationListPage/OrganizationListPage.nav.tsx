import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Fab, IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface OrganizationListPageNavProps {
  children: ReactNode;
}

export function OrganizationListPageNav({
  children,
}: OrganizationListPageNavProps): ReactElement {
  const { t } = useTranslation("organization-list");

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
      <Box sx={{ pt: 1, px: 3 }}>
        <Typography color="textSecondary">{t("description")}</Typography>

        <Fab
          component={ReactRouterLink}
          color="primary"
          sx={{ position: "absolute", bottom: 70, right: 10 }}
          to="/group/create"
        >
          <Add />
        </Fab>

        {children}
      </Box>
    </Nav>
  );
}
