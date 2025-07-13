import {
  AccountCircle,
  AddCircleOutlineRounded,
  BarChartRounded,
  CalendarMonthRounded,
  Chat,
  HomeRounded,
} from "@mui/icons-material";

import { OrganizationFeature } from "src/core/organizations";

import { DesktopNav, MobileNav } from "./types";

export const desktopNav: DesktopNav = {
  top: [
    {
      Icon: HomeRounded,
      checkIfActive: (path) => {
        if (path === "/blog/create") {
          return false;
        }

        return path === "/" || path.startsWith("/blog");
      },
      name: "navigation.blog",
      requiredFeatures: [OrganizationFeature.Blog],
      url: "/",
    },
    {
      Icon: AddCircleOutlineRounded,
      checkIfActive: (path) => path === "/blog/create",
      name: "navigation.create-blog",
      requiredFeatures: [OrganizationFeature.Blog],
      url: "/blog/create",
    },
    {
      Icon: CalendarMonthRounded,
      checkIfActive: (path) => path.startsWith("/bookings"),
      name: "navigation.bookings",
      requiredFeatures: [OrganizationFeature.Calendar],
      url: "/bookings",
    },
    {
      Icon: Chat,
      checkIfActive: (path) => path.startsWith("/chat"),
      name: "navigation.chat",
      requiredFeatures: [OrganizationFeature.Chat],
      url: "/chat",
    },
    {
      Icon: BarChartRounded,
      checkIfActive: (path) => path.startsWith("/time-series"),
      name: "navigation.time-series",
      requiredFeatures: [OrganizationFeature.TimeSeries],
      url: "/time-series",
    },
  ],
  bottom: [
    {
      Icon: AccountCircle,
      checkIfActive: (path) =>
        path.startsWith("/profile") || path.startsWith("/group"),
      name: "navigation.profile",
      requiredFeatures: [],
      url: "/profile",
    },
  ],
};

export const mobileNav: MobileNav = {
  bottom: [
    {
      Icon: HomeRounded,
      checkIfActive: (path) => {
        if (path === "/blog/create") {
          return false;
        }

        return path === "/" || path.startsWith("/blog");
      },
      name: "navigation.blog",
      requiredFeatures: [OrganizationFeature.Blog],
      url: "/",
    },
    {
      Icon: AddCircleOutlineRounded,
      checkIfActive: (path) => path === "/blog/create",
      name: "navigation.create-blog",
      requiredFeatures: [OrganizationFeature.Blog],
      url: "/blog/create",
    },
    {
      Icon: CalendarMonthRounded,
      checkIfActive: (path) => path.startsWith("/bookings"),
      name: "navigation.bookings",
      requiredFeatures: [OrganizationFeature.Calendar],
      url: "/bookings",
    },
    {
      Icon: Chat,
      checkIfActive: (path) => path.startsWith("/chat"),
      name: "navigation.chat",
      requiredFeatures: [OrganizationFeature.Chat],
      url: "/chat",
    },
    {
      Icon: BarChartRounded,
      checkIfActive: (path) => path.startsWith("/time-series"),
      name: "navigation.time-series",
      requiredFeatures: [OrganizationFeature.TimeSeries],
      url: "/time-series",
    },
    {
      Icon: AccountCircle,
      checkIfActive: (path) =>
        path.startsWith("/profile") || path.startsWith("/group"),
      name: "navigation.profile",
      requiredFeatures: [],
      url: "/profile",
    },
  ],
};
