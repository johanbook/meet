import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { Add, ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
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
      <Box sx={{ pt: 2, px: 3 }}>
        <Typography color="textSecondary" gutterBottom>
          {t("description")}
        </Typography>

        <Fab to="/group/create">
          <Add />
        </Fab>

        {children}
      </Box>
    </Nav>
  );
}
