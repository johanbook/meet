import { NotificationEventsConstants } from "src/constants/notification-events.constants";

export type NotificationData = Record<string, number | string>;

export type INotification = {
  data?: NotificationData;
  message: string;
  type: NotificationEventsConstants;
};
