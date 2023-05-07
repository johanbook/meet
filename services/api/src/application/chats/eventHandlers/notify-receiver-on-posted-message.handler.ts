import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { ChatMessageSentEvent } from "src/domain/chatMessages/events/chat-message-sent.event";

@EventsHandler(ChatMessageSentEvent)
export class NotifyReceiverOnPostedChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  handle(event: ChatMessageSentEvent) {
    this.notificationsGateway.notifyProfilesIfAvailable(
      [event.receiverId],
      "new_chat_message",
      "Reveived new message",
    );
  }
}
