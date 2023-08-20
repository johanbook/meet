import React, { ReactNode } from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

interface OrganizationPageNavProps {
  children: ReactNode;
}

export function OrganizationPageNav({
  children,
}: OrganizationPageNavProps): React.ReactElement {
  const { t } = useTranslation("organization");

  return (
    <>
      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>

      {children}
    </>
  );
}
