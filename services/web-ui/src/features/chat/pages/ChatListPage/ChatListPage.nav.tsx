import { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import { Edit } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";

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

      <Fab
        component={Link}
        color="primary"
        sx={{ position: "absolute", bottom: 70, right: 10 }}
        to="/chat/create"
      >
        <Edit />
      </Fab>

      {children}
    </Box>
  );
}
