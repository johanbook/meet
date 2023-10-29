import { ReactElement, ReactNode } from "react";

import { useIsMobile } from "src/hooks/useIsMobile";

import { DesktopDrawer } from "./DesktopDrawer";

interface DrawerProps {
  children: ReactNode;
}

export function Drawer({ children }: DrawerProps): ReactElement {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <></>;
  }

  return <DesktopDrawer>{children}</DesktopDrawer>;
}
