import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { Logger } from "src/core/logging";
import { ChatMessageSentEvent } from "src/features/chat/domain/events/chat-message-sent.event";

@EventsHandler(ChatMessageSentEvent)
export class AnalyzeChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  private logger = new Logger(AnalyzeChatMessageHandler.name);

  handle(event: ChatMessageSentEvent) {
    this.logger.log(`Analyzing message from '${event.senderId}'`);
  }
}
