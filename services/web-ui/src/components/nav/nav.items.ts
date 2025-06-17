import { AccountCircle, AddCircle, Chat, Home } from "@mui/icons-material";

import { DesktopNav, MobileNav } from "./types";

export const desktopNav: DesktopNav = {
  top: [
    {
      Icon: Home,
      checkIfActive: (path) => path === "/" || path.startsWith("/blog"),
      name: "navigation.blog",
      url: "/",
    },
    {
      Icon: Chat,
      checkIfActive: (path) => path.startsWith("/chat"),
      name: "navigation.chat",
      url: "/chat",
    },
  ],
  bottom: [
    {
      Icon: AccountCircle,
      checkIfActive: (path) =>
        path.startsWith("/profile") || path.startsWith("/group"),
      name: "navigation.profile",
      url: "/profile",
    },
  ],
};

export const mobileNav: MobileNav = {
  bottom: [
    {
      Icon: Home,
      checkIfActive: (path) => {
        if (path === "/blog/create") {
          return false;
        }

        return path === "/" || path.startsWith("/blog");
      },
      name: "navigation.blog",
      url: "/",
    },
    {
      Icon: AddCircle,
      checkIfActive: (path) => path === "/blog/create",
      name: "navigation.blog",
      url: "/blog/create",
    },
    {
      Icon: AccountCircle,
      checkIfActive: (path) =>
        path.startsWith("/profile") || path.startsWith("/group"),
      name: "navigation.profile",
      url: "/profile",
    },
  ],
};
