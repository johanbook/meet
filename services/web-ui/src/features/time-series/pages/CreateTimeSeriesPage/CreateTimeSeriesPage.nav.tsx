import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateTimeSeriesPageNavProps {
  children: ReactNode;
}

export function CreateTimeSeriesPageNav({
  children,
}: CreateTimeSeriesPageNavProps): ReactElement {
  const { t } = useTranslation("timeseries-creation");

  return (
    <Nav navBackTo="/time-series" title={t("header")}>
      {children}
    </Nav>
  );
}
