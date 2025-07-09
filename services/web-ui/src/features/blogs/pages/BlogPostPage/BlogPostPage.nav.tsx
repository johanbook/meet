import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";

interface BlogPostPageNavProps {
  children: ReactNode;
}

export function BlogPostPageNav({
  children,
}: BlogPostPageNavProps): ReactElement {
  return (
    <Nav navBackTo="/" padding="none">
      {children}
    </Nav>
  );
}
