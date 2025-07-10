import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateChatPageNavProps {
  children: ReactNode;
}

export function CreateChatPageNav({
  children,
}: CreateChatPageNavProps): ReactElement {
  const { t } = useTranslation("chat.create");

  return (
    <Nav navBackTo="/chat" padding="normal" title={t("header")}>
      {children}
    </Nav>
  );
}
