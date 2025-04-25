import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";

import { Edit } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";

import { Nav } from "src/components/nav";
import { CurrentOrganizationAvatar } from "src/components/nav/AppBar/CurrentOrganizationAvatar";
import { useTranslation } from "src/core/i18n";

interface ChatListPageNavProps {
  children: ReactNode;
}

export function ChatListPageNav(
  { children }: ChatListPageNavProps
): ReactElement {
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
      <Box sx={{ pt: 3, px: 3 }}>
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
    </Nav>
  );
}
