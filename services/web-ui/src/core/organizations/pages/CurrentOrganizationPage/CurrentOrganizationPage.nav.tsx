import { ReactElement, ReactNode } from "react";

import { Nav } from "src/components/nav";

interface CurrentOrganizationPageNavProps {
  children: ReactNode;
}

export function CurrentOrganizationPageNav({
  children,
}: CurrentOrganizationPageNavProps): ReactElement {
  return (
    <Nav navBackTo="/profile" padding="normal" title="">
      {children}
    </Nav>
  );
}
