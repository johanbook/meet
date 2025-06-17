import { SvgIconComponent } from "@mui/icons-material";

export interface NavItem {
  Icon: SvgIconComponent;
  checkIfActive: (path: string) => boolean;
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
