import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface ChatListPageNavProps {
  children: ReactNode;
}

export function ChatListPageNav({
  children,
}: ChatListPageNavProps): ReactElement {
  const { t } = useTranslation("connections");

  return (
    <Nav title={t("header")}>
      <Box sx={{ p: 2 }}>
        <Fab to="/chat/create">
          <Add />
        </Fab>

        {children}
      </Box>
    </Nav>
  );
}
