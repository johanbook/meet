import { ReactElement, ReactNode } from "react";

import { NavLayout } from "src/components/layout";
import { useTranslation } from "src/core/i18n";

interface AppearancePageNavProps {
  children: ReactNode;
}

export function AppearancePageNav({
  children,
}: AppearancePageNavProps): ReactElement {
  const { t } = useTranslation("settings");

  return (
    <NavLayout header={t("header")} linkText="Back" to="/profile">
      {children}
    </NavLayout>
  );
}
