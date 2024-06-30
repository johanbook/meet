import { ReactElement, ReactNode } from "react";

import { NavLayout } from "src/components/layout";
import { useTranslation } from "src/core/i18n";

interface BlogPostPageNavProps {
  children: ReactNode;
}

export function BlogPostPageNav({
  children,
}: BlogPostPageNavProps): ReactElement {
  const { t } = useTranslation("blog");

  return (
    <NavLayout linkText={t("links.back")} to="/">
      {children}
    </NavLayout>
  );
}
