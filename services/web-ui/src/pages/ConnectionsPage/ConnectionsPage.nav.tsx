import React, { ReactNode } from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export interface ConnectionsPageNavProps {
  children: ReactNode;
}

export function ConnectionsPageNav({
  children,
}: ConnectionsPageNavProps): React.ReactElement {
  const { t } = useTranslation("connections");

  return (
    <>
      <Typography sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>

      {children}
    </>
  );
}
