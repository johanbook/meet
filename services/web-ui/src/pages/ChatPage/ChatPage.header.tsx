import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Link as MuiLink, Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export function ChatPageHeader(): React.ReactElement {
  const { t } = useTranslation("chat");

  return (
    <>
      <MuiLink
        component={ReactRouterLink}
        sx={{
          display: "Flex",
          alignItems: "center",
          paddingBottom: 1,
        }}
        to="/chat"
        underline="hover"
      >
        <ArrowBackIosNew fontSize="small" />
        <span>{t("back")}</span>
      </MuiLink>
      <Typography variant="h5">{t("header")}</Typography>
    </>
  );
}
