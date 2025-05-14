import React from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export function NotFoundPage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Typography sx={{ color: "white", textAlign: "center" }} variant="h4">
      {t("page-not-found.text")}
    </Typography>
  );
}
