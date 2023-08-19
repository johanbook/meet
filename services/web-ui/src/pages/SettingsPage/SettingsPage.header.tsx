import React from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export function SettingsPageHeader(): React.ReactElement {
  const { t } = useTranslation("settings");

  return (
    <>
      <Typography gutterBottom variant="h5">
        {t("header")}
      </Typography>
    </>
  );
}
