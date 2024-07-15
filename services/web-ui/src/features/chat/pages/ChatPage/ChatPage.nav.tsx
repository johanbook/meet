import React, { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Link as MuiLink, Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

interface ChatPageNavProps {
  children: ReactNode;
}

export function ChatPageNav({
  children,
}: ChatPageNavProps): React.ReactElement {
  const { t } = useTranslation("chat");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        px: 3,
        pt: 1,
      }}
    >
      <MuiLink
        component={ReactRouterLink}
        sx={{
          display: "Flex",
          alignItems: "center",
          paddingBottom: 2,
          paddingTop: 1,
        }}
        to="/chat"
        underline="hover"
      >
        <ArrowBackIosNew fontSize="small" sx={{ paddingRight: 1 / 2 }} />
        <span>{t("back")}</span>
      </MuiLink>
      <Typography gutterBottom variant="h5">
        {t("header")}
      </Typography>

      {children}
    </Box>
  );
}
