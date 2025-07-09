import { FC } from "react";

import { useIsMobile } from "src/hooks/useIsMobile";

import { NavProps } from "../../types";
import { NavDesktop } from "../NavDesktop";
import { NavMobile } from "../NavMobile";

export const Nav: FC<NavProps> = (props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NavMobile {...props} />;
  }

  return <NavDesktop {...props} />;
};
