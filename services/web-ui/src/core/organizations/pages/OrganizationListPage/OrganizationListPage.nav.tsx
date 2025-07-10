import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface OrganizationListPageNavProps {
  children: ReactNode;
}

export function OrganizationListPageNav({
  children,
}: OrganizationListPageNavProps): ReactElement {
  const { t } = useTranslation("organization-list");

  return (
    <Nav
      navBackTo="/profile"
      padding="normal"
      subtitle={t("description")}
      title={t("header")}
    >
      <Fab to="/group/create">
        <Add />
      </Fab>

      {children}
    </Nav>
  );
}
