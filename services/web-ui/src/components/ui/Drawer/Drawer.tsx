import React from "react";

import { useIsMobile } from "../../../hooks/useIsMobile";
import DesktopDrawer from "./DesktopDrawer";
import MobileDrawer from "./MobileDrawer";

interface DrawerProps {
  children: React.ReactNode;
}

export default function Drawer({ children }: DrawerProps): React.ReactElement {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDrawer>{children}</MobileDrawer>;
  }

  return (
    <>
      <DesktopDrawer>{children}</DesktopDrawer>
    </>
  );
}
