import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { Add } from "@mui/icons-material";
import { Box, Fab, Typography, Zoom } from "@mui/material";

import { Nav } from "src/components/nav";
import { CurrentOrganizationAvatar } from "src/components/nav/AppBar/CurrentOrganizationAvatar";
import { useTranslation } from "src/core/i18n";
import { useIsMobile } from "src/hooks/useIsMobile";

interface ChatListPageNavProps {
  children: ReactNode;
}

export function ChatListPageNav({
  children,
}: ChatListPageNavProps): ReactElement {
  const { t } = useTranslation("connections");
  const isMobile = useIsMobile();

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
        <Zoom in>
          <Fab
            component={Link}
            color="primary"
            sx={{ position: "absolute", bottom: isMobile ? 70 : 10, right: 10 }}
            to="/chat/create"
          >
            <Add />
          </Fab>
        </Zoom>

        {children}
      </Box>
    </Nav>
  );
}
