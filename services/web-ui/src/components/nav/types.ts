import { SvgIconComponent } from "@mui/icons-material";

export interface NavItem {
  Icon: SvgIconComponent;
  isActive?: RegExp;
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
