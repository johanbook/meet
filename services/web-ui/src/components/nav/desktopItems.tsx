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
    name: "Blogs",
    url: "/",
  },
  {
    Icon: Chat,
    name: "Conversations",
    url: "/chat",
  },
];

export const bottomNavItems: NavItem[] = [
  {
    Icon: AccountCircle,
    name: "Profile",
    url: "/profile",
  },
];
