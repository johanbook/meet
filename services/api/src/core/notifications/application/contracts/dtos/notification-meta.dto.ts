import { NotificationEventsConstants } from "src/core/notifications/constants/notification-events.constants";
import { NotificationData } from "src/core/notifications/types";

export enum NotificationEventNames {
  Notification = "notification",
}

export class WebSocketNotificationDetail {
  description!: string;
  data?: NotificationData;
  message!: string;
  resourcePath!: string;
  type!: NotificationEventsConstants;
}

export class NotificationMetaDetails {
  ws!: {
    detail: WebSocketNotificationDetail;
    eventNames: NotificationEventNames;
  };
}
