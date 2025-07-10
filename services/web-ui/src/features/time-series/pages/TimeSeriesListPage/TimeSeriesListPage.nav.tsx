import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface TimeSeriesListPageNavProps {
  children: ReactNode;
}

export function TimeSeriesListPageNav({
  children,
}: TimeSeriesListPageNavProps): ReactElement {
  const { t } = useTranslation("time-series");

  return (
    <Nav padding="normal" title={t("header")}>
      <Fab to="/time-series/create">
        <Add />
      </Fab>

      {children}
    </Nav>
  );
}
