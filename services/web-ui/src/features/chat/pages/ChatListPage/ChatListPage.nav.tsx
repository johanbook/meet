import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { CurrentOrganizationAvatar } from "src/components/nav/AppBar/CurrentOrganizationAvatar";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface ChatListPageNavProps {
  children: ReactNode;
}

export function ChatListPageNav({
  children,
}: ChatListPageNavProps): ReactElement {
  const { t } = useTranslation("connections");

  const appBarContent = (
    <>
      <CurrentOrganizationAvatar />
      <Typography sx={{ pl: 2 }} variant="h5">
        {t("header")}
      </Typography>
    </>
  );

  return (
    <Nav appBarContent={appBarContent}>
      <Box sx={{ p: 3 }}>
        <Fab to="/chat/create">
          <Add />
        </Fab>

        {children}
      </Box>
    </Nav>
  );
}
