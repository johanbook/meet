import { ReactElement, ReactNode } from "react";

import { Box, Typography } from "@mui/material";

import { useTranslation } from "src/core/i18n";

export interface ChatListPageNavProps {
  children: ReactNode;
}

export function ChatListPageNav({
  children,
}: ChatListPageNavProps): ReactElement {
  const { t } = useTranslation("connections");

  return (
    <Box sx={{ pt: 3, px: 3 }}>
      <Typography variant="h5">{t("header")}</Typography>

      {children}
    </Box>
  );
}
