import { ReactElement, ReactNode } from "react";

import { useIsMobile } from "src/hooks/useIsMobile";

import { NavDesktop } from "../NavDesktop";
import { NavMobile } from "../NavMobile";

interface NavProps {
  appBarContent?: ReactNode;
  children: ReactNode;
}

export function Nav(props: NavProps): ReactElement {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NavMobile {...props} />;
  }

  return <NavDesktop {...props} />;
}
