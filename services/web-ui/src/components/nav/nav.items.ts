import {
  AccountCircle,
  Chat,
  Feed,
  SvgIconComponent,
} from "@mui/icons-material";

export interface NavItem {
  Icon: SvgIconComponent;
  isActive?: RegExp;
  name: string;
  url: string;
}

export const desktopNavItems: NavItem[] = [
  {
    Icon: Feed,
    isActive: /^(\/$|\/blog)/,
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

export const mobileNavItems: NavItem[] = [
  {
    Icon: Feed,
    isActive: /^(\/$|\/blog)/,
    name: "navigation.blog",
    url: "/",
  },
  {
    Icon: Chat,
    name: "navigation.chat",
    url: "/chat",
  },
  {
    Icon: AccountCircle,
    name: "navigation.profile",
    url: "/profile",
  },
];
