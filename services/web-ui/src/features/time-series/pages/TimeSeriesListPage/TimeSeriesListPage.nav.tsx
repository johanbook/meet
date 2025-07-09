import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import { CurrentOrganizationAvatar, Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface TimeSeriesListPageNavProps {
  children: ReactNode;
}

export function TimeSeriesListPageNav({
  children,
}: TimeSeriesListPageNavProps): ReactElement {
  const { t } = useTranslation("timeseries");

  const appBarContent = (
    <>
      <CurrentOrganizationAvatar />
      <Typography sx={{ pl: 2 }} variant="h5">
        {t("header")}
      </Typography>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Fab to="/time-series/create">
        <Add />
      </Fab>

      <Box sx={{ p: 2 }}>{children}</Box>
    </Nav>
  );
}
