import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { NotificationEventsConstants } from "src/constants/notification-events.constants";

import { ChatMessageSentEvent } from "../../../domain/events/chat-message-sent.event";

@EventsHandler(ChatMessageSentEvent)
export class NotifyReceiverOnPostedChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  handle(event: ChatMessageSentEvent) {
    this.notificationsGateway.notifyProfilesIfAvailable([event.receiverId], {
      data: { receiverId: event.receiverId, senderId: event.senderId },
      message: "Reveived new message",
      type: NotificationEventsConstants.NEW_CHAT_MESSAGE,
    });
  }
}
