import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface TimeSeriesPageNavProps {
  children: ReactNode;
}

export function TimeSeriesPageNav({
  children,
}: TimeSeriesPageNavProps): ReactElement {
  const { t } = useTranslation("time-series");

  return (
    <Nav navBackTo="/time-series" title={t("header")}>
      <Box sx={{ p: 2 }}> {children}</Box>
    </Nav>
  );
}
