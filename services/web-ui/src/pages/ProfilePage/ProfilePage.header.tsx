import React from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export function ProfilePageHeader(): React.ReactElement {
  const { t } = useTranslation("profile");

  return (
    <>
      <Typography sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>
    </>
  );
}
