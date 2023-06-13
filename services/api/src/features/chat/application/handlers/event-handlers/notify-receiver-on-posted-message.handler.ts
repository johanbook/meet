import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { NotificationEventsConstants } from "src/constants/notification-events.constants";
import { NotificationService } from "src/core/notifications";

import { ChatMessageSentEvent } from "../../../domain/events/chat-message-sent.event";

@EventsHandler(ChatMessageSentEvent)
export class NotifyReceiverOnPostedChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(private readonly notificationService: NotificationService) {}

  handle(event: ChatMessageSentEvent) {
    this.notificationService.notifyProfilesIfAvailable([event.receiverId], {
      data: { receiverId: event.receiverId, senderId: event.senderId },
      message: "Reveived new message",
      type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
    });
  }
}
