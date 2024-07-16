import { ReactElement, ReactNode } from "react";

import { NavLayout } from "src/components/layout";
import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface BlogPostPageNavProps {
  children: ReactNode;
}

export function BlogPostPageNav({
  children,
}: BlogPostPageNavProps): ReactElement {
  const { t } = useTranslation("blog");

  return (
    <Nav>
      <NavLayout linkText={t("links.back")} to="/">
        {children}
      </NavLayout>
    </Nav>
  );
}
