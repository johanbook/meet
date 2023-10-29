import { AccountCircle, Chat, Feed } from "@mui/icons-material";

import { DesktopNav, MobileNav } from "./types";

export const desktopNav: DesktopNav = {
  top: [
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
  ],
  bottom: [
    {
      Icon: AccountCircle,
      name: "navigation.profile",
      url: "/profile",
    },
  ],
};

export const mobileNav: MobileNav = {
  bottom: [
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
  ],
};
