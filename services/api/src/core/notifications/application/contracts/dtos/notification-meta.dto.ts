import { NotificationEventEnum } from "../../../notification-event.enum";
import { NotificationData } from "../../../types";

export enum NotificationEventNames {
  Notification = "notification",
}

export class NotificationWebSocketDetails {
  description!: string;
  data!: NotificationData;
  message!: string;
  resourcePath!: string;
  type!: NotificationEventEnum;
}

export class NotificationMetaDetails {
  ws!: {
    details: NotificationWebSocketDetails;
    eventNames: NotificationEventNames;
  };
}
