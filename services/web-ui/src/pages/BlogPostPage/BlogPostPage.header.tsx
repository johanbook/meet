import React from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export function BlogPostPageHeader(): React.ReactElement {
  const { t } = useTranslation("blog");

  return (
    <>
      <Typography variant="h5">{t("title")}</Typography>
      <Typography color="textSecondary" gutterBottom>
        {t("description")}
      </Typography>
    </>
  );
}
