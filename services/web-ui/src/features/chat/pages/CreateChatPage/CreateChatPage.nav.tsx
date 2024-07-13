import { ReactElement, ReactNode } from "react";

import { NavLayout } from "src/components/layout";
import { useTranslation } from "src/core/i18n";

interface CreateChatPageNavProps {
  children: ReactNode;
}

export function CreateChatPageNav({
  children,
}: CreateChatPageNavProps): ReactElement {
  const { t } = useTranslation("chat-create");

  return (
    <NavLayout header={t("header")} linkText="Back" to="/chat">
      {children}
    </NavLayout>
  );
}
