import React, { ReactNode } from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export interface ConversationsPageNavProps {
  children: ReactNode;
}

export function ConversationsPageNav({
  children,
}: ConversationsPageNavProps): React.ReactElement {
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
