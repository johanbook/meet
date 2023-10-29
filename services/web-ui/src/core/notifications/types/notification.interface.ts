import { NotificationEventsConstants } from "../constants/notification-events.constants";

interface BaseNotification {
  message: string;
}

export interface NewChatMessageNotification extends BaseNotification {
  data: {
    receiverId: string;
    senderId: string;
  };
  type: NotificationEventsConstants.NEW_CHAT_MESSAGE;
}

export type INotification = NewChatMessageNotification;
