import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";

export interface NotFoundNavProps {
  children: ReactNode;
}

export function NotFoundNav({ children }: NotFoundNavProps): ReactElement {
  return <Nav padding="none">{children}</Nav>;
}
