import React, { ReactNode } from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

interface OrganizationListPageNavProps {
  children: ReactNode;
}

export function OrganizationListPageNav({
  children,
}: OrganizationListPageNavProps): React.ReactElement {
  const { t } = useTranslation("organization-list");

  return (
    <>
      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>

      <Typography color="textSecondary">{t("description")}</Typography>

      {children}
    </>
  );
}
