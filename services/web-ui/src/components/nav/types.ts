import { ReactNode } from "react";

import { SvgIconComponent } from "@mui/icons-material";

import { OrganizationFeature } from "src/core/organizations";

export interface NavItem {
  Icon: SvgIconComponent;
  checkIfActive: (path: string) => boolean;
  requiredFeatures: OrganizationFeature[];
  name: string;
  url: string;
}

export interface DesktopNav {
  top: NavItem[];
  bottom: NavItem[];
}

export interface MobileNav {
  bottom: NavItem[];
}

export interface NavProps {
  appBarContent?: ReactNode;
  children: ReactNode;
  navBackTo?: string;
  padding: "none" | "normal";
  title?: string;
  subtitle?: string;
}
