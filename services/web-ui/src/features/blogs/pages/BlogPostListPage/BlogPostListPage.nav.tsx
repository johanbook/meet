import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";

interface BlogPostListPageNavProps {
  children: ReactNode;
}

export function BlogPostListPageNav({
  children,
}: BlogPostListPageNavProps): ReactElement {
  return <Nav>{children}</Nav>;
}
