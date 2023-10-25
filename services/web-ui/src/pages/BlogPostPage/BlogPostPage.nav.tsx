import { ReactElement, ReactNode } from "react";

interface BlogPostPageNavProps {
  children: ReactNode;
}

export function BlogPostPageNav({
  children,
}: BlogPostPageNavProps): ReactElement {
  return <>{children}</>;
}
