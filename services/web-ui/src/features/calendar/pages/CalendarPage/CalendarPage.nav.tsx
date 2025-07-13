import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CalendarPageNavProps {
  children: ReactNode;
}

export function CalendarPageNav({
  children,
}: CalendarPageNavProps): ReactElement {
  const { t } = useTranslation("core");

  return (
    <Nav navBackTo="/" padding="normal" title={t("navigation.calendar")}>
      {children}
    </Nav>
  );
}
