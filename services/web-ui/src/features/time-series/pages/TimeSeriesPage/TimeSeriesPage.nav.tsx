import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface TimeSeriesPageNavProps {
  children: ReactNode;
  title?: string;
}

export function TimeSeriesPageNav({
  children,
  title,
}: TimeSeriesPageNavProps): ReactElement {
  const { t } = useTranslation("time-series");

  return (
    <Nav navBackTo="/time-series" padding="normal" title={title || t("header")}>
      {children}
    </Nav>
  );
}
