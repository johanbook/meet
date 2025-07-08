import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface TimeSeriesPageNavProps {
  children: ReactNode;
}

export function TimeSeriesPageNav({
  children,
}: TimeSeriesPageNavProps): ReactElement {
  const { t } = useTranslation("time-series");

  const appBarContent = (
    <>
      <IconButton component={Link} sx={{ mr: 2 }} to="/time-series">
        <ArrowBack />
      </IconButton>

      <Typography variant="h5">{t("header")}</Typography>
    </>
  );

  return <Nav appBarContent={appBarContent}>{children}</Nav>;
}
