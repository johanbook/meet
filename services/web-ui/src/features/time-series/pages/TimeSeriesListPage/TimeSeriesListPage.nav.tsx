import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface TimeSeriesListPageNavProps {
  children: ReactNode;
}

export function TimeSeriesListPageNav({
  children,
}: TimeSeriesListPageNavProps): ReactElement {
  const { t } = useTranslation("timeseries");

  return (
    <Nav title={t("header")}>
      <Fab to="/time-series/create">
        <Add />
      </Fab>

      <Box sx={{ p: 2, height: "100%" }}>{children}</Box>
    </Nav>
  );
}
