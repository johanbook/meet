import { NotificationEventEnum } from "./notification-event.enum";

export type NotificationData = Record<string, number | string>;

export interface INotification {
  description: string;
  data?: NotificationData;
  message: string;
  resourcePath: string;
  type: NotificationEventEnum;
}
