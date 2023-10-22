import {
  AccountCircle,
  Chat,
  Feed,
  SvgIconComponent,
} from "@mui/icons-material";

export interface NavItem {
  Icon: SvgIconComponent;
  name: string;
  url: string;
}

export const desktopNavItems: NavItem[] = [
  {
    Icon: Feed,
    name: "navigation.blog",
    url: "/",
  },
  {
    Icon: Chat,
    name: "navigation.chat",
    url: "/chat",
  },
];

export const bottomNavItems: NavItem[] = [
  {
    Icon: AccountCircle,
    name: "navigation.profile",
    url: "/profile",
  },
];
