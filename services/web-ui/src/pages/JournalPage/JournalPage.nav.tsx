import { ReactElement, ReactNode } from "react";

import { Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

interface JournalPageNavProps {
  children: ReactNode;
}

export function JournalPageNav({
  children,
}: JournalPageNavProps): ReactElement {
  const { t } = useTranslation("journal");

  return (
    <>
      <Typography gutterBottom sx={{ paddingTop: 2 }} variant="h5">
        {t("header")}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {t("description")}
      </Typography>

      {children}
    </>
  );
}
