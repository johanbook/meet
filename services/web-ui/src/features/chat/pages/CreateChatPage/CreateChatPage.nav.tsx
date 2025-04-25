import { ReactElement, ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router";

import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateChatPageNavProps {
  children: ReactNode;
}

export function CreateChatPageNav(
  { children }: CreateChatPageNavProps
): ReactElement {
  const { t } = useTranslation("chat-create");

  const appBarContent = (
    <>
      <IconButton component={ReactRouterLink} to="/chat">
        <ArrowBack />

        <Typography color="textPrimary" sx={{ pl: 3 }} variant="h5">
          {t("header")}
        </Typography>
      </IconButton>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ px: 3, pt: 1 }}>{children}</Box>
    </Nav>
  );
}
