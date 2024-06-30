import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";

import { ChatMessage } from "../../infrastructure/entities/chat-message.entity";
import { ChatMessageSentEvent } from "../events/chat-message-sent.event";

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(ChatMessage)
    private readonly chatMessages: Repository<ChatMessage>,
  ) {}

  async saveChatMessage(chatMessage: ChatMessage): Promise<void> {
    const createdChatMessage = await this.chatMessages.save(chatMessage);

    const event = map(ChatMessageSentEvent, {
      conversationId: createdChatMessage.conversationId,
      id: createdChatMessage.id,
      message: createdChatMessage.message,
      senderId: createdChatMessage.senderId,
    });

    this.eventBus.publish(event);
  }
}
