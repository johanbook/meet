import React from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

import { NotFoundNav } from "./NotFoundPage.nav";

export function NotFoundPage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <NotFoundNav>
      <Typography>{t("page-not-found.text")}</Typography>
    </NotFoundNav>
  );
}
