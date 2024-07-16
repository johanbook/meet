import { ReactElement, ReactNode } from "react";

import { NavLayout } from "src/components/layout";
import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CurrentOrganizationPageNavProps {
  children: ReactNode;
}

export function CurrentOrganizationPageNav({
  children,
}: CurrentOrganizationPageNavProps): ReactElement {
  const { t } = useTranslation("organization");

  return (
    <Nav>
      <NavLayout linkText={t("links.back")} to="/profile">
        {children}
      </NavLayout>
    </Nav>
  );
}
