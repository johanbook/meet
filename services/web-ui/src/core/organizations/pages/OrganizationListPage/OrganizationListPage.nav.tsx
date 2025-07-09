import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

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

  return (
    <Nav navBackTo="/profile" title={t("header")}>
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
