import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface SettingsPageNavProps {
  children: ReactNode;
}

export function SettingsPageNav({
  children,
}: SettingsPageNavProps): ReactElement {
  const { t } = useTranslation("settings");

  return (
    <Nav navBackTo="/profile" padding="normal" title={t("header")}>
      {children}
    </Nav>
  );
}
