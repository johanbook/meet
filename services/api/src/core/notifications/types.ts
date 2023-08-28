import { NotificationEventsConstants } from "./constants/notification-events.constants";

export type NotificationData = Record<string, number | string>;

export type INotification = {
  description: string;
  data?: NotificationData;
  message: string;
  type: NotificationEventsConstants;
};
