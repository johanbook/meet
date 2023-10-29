import React, { ReactNode } from "react";

import { Typography } from "@mui/material";

import { NavLayout } from "src/components/layout";
import { useTranslation } from "src/core/i18n";

interface OrganizationListPageNavProps {
  children: ReactNode;
}

export function OrganizationListPageNav({
  children,
}: OrganizationListPageNavProps): React.ReactElement {
  const { t } = useTranslation("organization-list");

  return (
    <NavLayout header={t("header")} linkText={t("links.back")} to="/profile">
      <Typography color="textSecondary">{t("description")}</Typography>

      {children}
    </NavLayout>
  );
}
