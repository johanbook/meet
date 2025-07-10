import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";
import { useTranslation } from "src/core/i18n";

interface CreateBlogPostPageNavProps {
  children: ReactNode;
}

export function CreateBlogPostPageNav({
  children,
}: CreateBlogPostPageNavProps): ReactElement {
  const { t } = useTranslation("blog.creation");

  return (
    <Nav navBackTo="/" padding="normal" title={t("header")}>
      {children}
    </Nav>
  );
}
