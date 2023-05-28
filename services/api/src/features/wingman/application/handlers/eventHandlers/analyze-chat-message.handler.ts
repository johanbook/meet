import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { ChatMessageSentEvent } from "src/domain/chatMessages/events/chat-message-sent.event";
import { Logger } from "src/infrastructure/logger.service";

@EventsHandler(ChatMessageSentEvent)
export class AnalyzeChatMessageHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  private logger = new Logger(AnalyzeChatMessageHandler.name);

  handle(event: ChatMessageSentEvent) {
    this.logger.log(`Analyzing message from '${event.senderId}'`);
  }
}
