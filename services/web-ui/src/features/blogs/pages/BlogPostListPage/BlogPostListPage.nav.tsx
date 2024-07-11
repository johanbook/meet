import { ReactElement, ReactNode } from "react";

interface BlogPostListPageNavProps {
  children: ReactNode;
}

export function BlogPostListPageNav({
  children,
}: BlogPostListPageNavProps): ReactElement {
  return <>{children}</>;
}
