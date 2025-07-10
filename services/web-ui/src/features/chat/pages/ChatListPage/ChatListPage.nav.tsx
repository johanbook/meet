import { ReactElement, ReactNode } from "react";

import { Add } from "@mui/icons-material";

import { Nav } from "src/components/nav";
import { Fab } from "src/components/ui/Fab";
import { useTranslation } from "src/core/i18n";

interface ChatListPageNavProps {
  children: ReactNode;
}

export function ChatListPageNav({
  children,
}: ChatListPageNavProps): ReactElement {
  const { t } = useTranslation("chat.list");

  return (
    <Nav padding="normal" title={t("header")}>
      <Fab to="/chat/create">
        <Add />
      </Fab>

      {children}
    </Nav>
  );
}
