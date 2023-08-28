import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import {
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";
import { INotification } from "src/core/notifications/types";

import { ChatMessageSentEvent } from "../../../domain/events/chat-message-sent.event";

@EventsHandler(ChatMessageSentEvent)
export class NotifyReceiverOnPostedChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(private readonly notificationService: NotificationService) {}

  handle(event: ChatMessageSentEvent) {
    const notification: INotification = {
      data: { receiverId: event.receiverId, senderId: event.senderId },
      description: "Someone sent you a message in Meet",
      message: "You reveived a new message",
      type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
    };

    this.notificationService.notifyProfilesIfAvailable(
      [event.receiverId],
      notification,
    );
  }
}
