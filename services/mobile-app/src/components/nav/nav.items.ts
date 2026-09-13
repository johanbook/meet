import { OrganizationFeature } from "src/core/organizations";
import { IconName } from "src/components/ui/Icon/Icon";

export interface NavItem {
  feature?: OrganizationFeature;
  icon: IconName;
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: "dashboard", label: "Moments", path: "/", feature: OrganizationFeature.Blog },
  {
    icon: "add",
    label: "Share a moment",
    path: "/blog/create",
    feature: OrganizationFeature.Blog,
  },
  {
    icon: "calendarMonth",
    label: "Bookings",
    path: "/bookings",
    feature: OrganizationFeature.Bookings,
  },
  {
    icon: "chat",
    label: "Chats",
    path: "/chat",
    feature: OrganizationFeature.Chat,
  },
  {
    icon: "barChart",
    label: "Time-series",
    path: "/time-series",
    feature: OrganizationFeature.TimeSeries,
  },
  { icon: "heart", label: "Profile", path: "/profile" },
];