import { ReactElement, ReactNode } from "react";

import { Box } from "@mui/material";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateChatPageNavProps {
  children: ReactNode;
}

export function CreateChatPageNav({
  children,
}: CreateChatPageNavProps): ReactElement {
  const { t } = useTranslation("chat-create");

  return (
    <Nav navBackTo="/chat" title={t("header")}>
      <Box sx={{ px: 3, pt: 1 }}>{children}</Box>
    </Nav>
  );
}
