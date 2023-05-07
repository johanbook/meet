import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ChatMessage } from "src/infrastructure/database/entities/chat-message.entity";
import { map } from "src/utils/mapper";

import { ChatMessageSentEvent } from "../events/chat-message-sent.event";

@Injectable()
export class ChatMessageDomainService {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(ChatMessage)
    private readonly chatMessages: Repository<ChatMessage>,
  ) {}

  async saveChatMessage(chatMessage: ChatMessage): Promise<void> {
    const createdChatMessage = await this.chatMessages.save(chatMessage);

    const event = map(ChatMessageSentEvent, {
      id: createdChatMessage.id,
      message: createdChatMessage.message,
      receiverId: createdChatMessage.receiverId,
      senderId: createdChatMessage.senderId,
    });

    this.eventBus.publish(event);
  }
}
